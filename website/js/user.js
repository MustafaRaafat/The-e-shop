const username = document.getElementsByTagName('h6')[0];
// const signout=document.getElementById("signout");



/* Function to user Data */
const getuser = async () => {
    const responseFromServer = await fetch('/getuser');
    try {
        const results = await responseFromServer.json();
        // console.log(results);
        // visit_number.textContent = results.visit;
        username.textContent = results.name.firstName + " " + results.name.lastName;

    }
    catch (error) {
        console.log( error);
    }
};
getuser();
  // end

// function to sign out
function signout2(){
  signout();
}
const signout = async () => {
    const res = await fetch('/signout');
    try {
      const clintnewdata = await res.json();
      if(clintnewdata.message=='done'){
        window.location.replace('/login.html');
      }
      return clintnewdata;
    } catch (error) {
      console.log('error');
    }
  }