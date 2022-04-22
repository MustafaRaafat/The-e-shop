const images = document.getElementById("imageupload");
const imagepreview = document.getElementById("imagepreview");
imagepreview.style.display = "none";
let img;

function update() {
    let data = {title:"car",categoryName:"null",price:"100",quantity:"5",images:""};
    console.log(data);
    postnew(data);
}
function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        imagepreview.src = src;
        imagepreview.style.display = "block"
        img=src;
        console.log(event.target.files[0]);
    }
}

/* Function to POST data */
const postnew = async (data = {}) => {
    const res = await fetch("https://e-commerce-04-2022.herokuapp.com/api/product/add",
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header   
        });
    try {
        const clintnewdata = await res.json();
        console.log(clintnewdata);
        return clintnewdata;
    } catch (error) {
        console.log('error');
    }
}

'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));