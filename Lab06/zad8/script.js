fetch('files/all.json')
    .then(response => response.json())
    .then(data => {
        const extractedData = data.map(item => ({
            name: item.name.common,
            capital: Array.isArray(item.capital) ? item.capital[0] : item.capital,
            population: item.population,
            area: item.area,
            subregion: item.subregion
        }));

        function getSortedData(sortBy, sortFlag) {
            if (sortBy === 'Name') {
                return extractedData.sort((a, b) => (sortFlag ? 1 : -1) * (a.name || '').localeCompare(b.name || ''));
            } else if (sortBy === 'Capital') {
                return extractedData.sort((a, b) => (sortFlag ? 1 : -1) * (a.capital || '').localeCompare(b.capital || ''));
            }
            return extractedData.sort((a, b) => (sortFlag ? 1 : -1) * ((b[sortBy] || 0) - (a[sortBy] || 0)));
        }

        const name_constraint = document.getElementById("nameFilter");
        const capital_constraint = document.getElementById("capitalFilter");
        const population_constraint = document.getElementById("populationFilter");
        const area_constraint = document.getElementById("areaFilter");

        function filterData() {
            const name = name_constraint.value || '';
            const capital = capital_constraint.value || '';
            const population = population_constraint.value || 0;
            const area = area_constraint.value || 0;
            const filteredData = extractedData.filter(item => {
                return toLowerCase(item.name || '').includes(toLowerCase(name)) &&
                    toLowerCase(item.capital || '').includes(toLowerCase(capital)) &&
                    (item.population || 0) >= population &&
                    (item.area || 0) >= area;
            });
            return filteredData;
        }

        function toLowerCase(item) {
            return item.toLowerCase();
        }

        function toUpperCase(item) {
            return item.toUpperCase();
        }

        function renderData(data, sortBy, sortFlag) {
            const tableDiv = document.getElementById("table-div");
            tableDiv.innerHTML = '';

            const dataSort = getSortedData(sortBy, sortFlag);
            const dataFiltered = filterData();

            const subregions = {};

            dataFiltered.forEach(item => {
                if (!subregions[item.subregion]) {
                    subregions[item.subregion] = [];
                }
                subregions[item.subregion].push(item);
            });

            const accordion = document.createElement('div');
            accordion.classList.add('accordion');
            accordion.setAttribute('id', 'mainAccordion');

            let id = 0;
            for (const subregion in subregions) {
                const accordionItem = document.createElement('div');
                accordionItem.classList.add(`page${Math.floor(id / 5)}`);
                if (id >= 5) {
                    accordionItem.style.display = 'none'; 
                }
                id += 1;
                accordionItem.classList.add('accordion-item');

                const accordionHeader = document.createElement('div');
                accordionHeader.classList.add('accordion-header');

                const accordionHeaderButton = document.createElement('button');
                accordionHeaderButton.classList.add('accordion-button', 'collapsed');
                accordionHeaderButton.setAttribute('type', 'button');
                accordionHeaderButton.setAttribute('data-bs-toggle', 'collapse');
                accordionHeaderButton.setAttribute('data-bs-target', `#collapse${subregion.replace(/\s/g, '')}`); // fix - Remove whitespace from subregion name

                const subregionData = subregions[subregion];
                const totalPopulation = subregionData.reduce((total, item) => total + item.population, 0);
                const totalArea = subregionData.reduce((total, item) => total + item.area, 0);

                accordionHeaderButton.textContent = `${subregion}:   ${totalPopulation} people, ${totalArea} km2`;

                accordionHeader.appendChild(accordionHeaderButton);
                accordionItem.appendChild(accordionHeader);

                const accordionBody = document.createElement('div');
                accordionBody.classList.add('accordion-collapse', 'collapse');
                accordionBody.setAttribute('id', `collapse${subregion.replace(/\s/g, '')}`); // Remove whitespace from subregion name

                const table = document.createElement('table');
                table.classList.add('table', 'table-striped');
                const tableBody = document.createElement('tbody');
                subregionData.forEach(item => {
                    const row = document.createElement('tr');

                    const nameCell = document.createElement('td');
                    nameCell.textContent = item.name;
                    row.appendChild(nameCell);

                    const capitalCell = document.createElement('td');
                    capitalCell.textContent = item.capital;
                    row.appendChild(capitalCell);

                    const populationCell = document.createElement('td');
                    populationCell.textContent = item.population;
                    row.appendChild(populationCell);

                    const areaCell = document.createElement('td');
                    areaCell.textContent = item.area;
                    row.appendChild(areaCell);

                    tableBody.appendChild(row);
                });

                table.appendChild(tableBody);
                accordionBody.appendChild(table);

                accordionItem.appendChild(accordionBody);
                accordion.appendChild(accordionItem);
            }

            tableDiv.appendChild(accordion);
            renderPagination(Math.floor(id / 5));
        }

        function renderPagination(pages) {
            const paginationElement = document.getElementById('pagination-div');
            paginationElement.innerHTML = ''; // Clear existing pagination buttons

            for (let i = 0; i < pages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i + 1;
                pageButton.classList.add('btn', 'btn-primary', 'mx-1');
                pageButton.addEventListener('click', () => {
                    const accordionItems = document.querySelectorAll('.accordion-item');
                    accordionItems.forEach(item => {
                        if (item.classList.contains(`page${i}`)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none'; 
                        }
                    });
                });
                paginationElement.appendChild(pageButton);
            }
        }

        const nameSort = document.getElementById("nameSort");
        const capitalSort = document.getElementById("capitalSort");
        const populationSort = document.getElementById("populationSort");
        const areaSort = document.getElementById("areaSort");
        let nameSortFlag = false;
        let capitalSortFlag = false;
        let populationSortFlag = false;
        let areaSortFlag = false;

        nameSort.addEventListener("click", () => {
            nameSortFlag = !nameSortFlag;
            renderData(extractedData, 'Name', nameSortFlag);
            if (nameSortFlag) {
                nameSort.textContent = 'Name ▼';
            } else {
                nameSort.textContent = 'Name ▲';
            }
        });
        capitalSort.addEventListener("click", () => {
            capitalSortFlag = !capitalSortFlag;
            renderData(extractedData, 'Capital', capitalSortFlag);
            if (capitalSortFlag) {
                capitalSort.textContent = 'Capital ▼';
            } else {
                capitalSort.textContent = 'Capital ▲';
            }
        });
        populationSort.addEventListener("click", () => {
            populationSortFlag = !populationSortFlag;
            renderData(extractedData, 'population', populationSortFlag);
            if (populationSortFlag) {
                populationSort.textContent = 'Population ▼';
            } else {
                populationSort.textContent = 'Population ▲';
            }
        });
        areaSort.addEventListener("click", () => {
            areaSortFlag = !areaSortFlag;
            renderData(extractedData, 'area', areaSortFlag);
            if (areaSortFlag) {
                areaSort.textContent = 'Area ▼';
            } else {
                areaSort.textContent = 'Area ▲';
            }
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });
