let user_name = ""
function showInput(){
  user_name = prompt("Podaj imię: ", "Jan")
  update_name()
}
function update_name(){
  document.getElementById("js-name").innerHTML = user_name
}