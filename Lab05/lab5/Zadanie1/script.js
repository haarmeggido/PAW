let user_name = ""
function showInput(){
  user_name = prompt("Podaj imię: ", "Jan")
  update_name()
}
function update_name(){
  string = ""
  if(user_name[user_name.length-1] == 'a'){
    string = "Witam panią "
  } else { 
    string = "Witam pana "
  }
  string += user_name

  document.getElementById("js-name").innerHTML = string
}