function custonRender(reactElemnet, container) {
    //here we have to set each attribute seperately
  /*const domElement=document.createElement(reactElemnet.type)
    domElement.innerHTML=reactElemnet.children
    domElement.setAttribute('href',reactElemnet.props.href)
    domElement.setAttribute('target',reactElemnet.props.target)

    container.appendChild(domElement)
    */

   //so we will use loop to set attributes
   
   /*
   note:this is the syntax equivalent to what we write in jsx file in div
   this code is telling behind the scenes of what is happening in jsx file 
   and the code is shorter in jsx as it has js+html mixed so easier to write
   */ 
  const domElement = document.createElement(reactElemnet.type);
  domElement.innerHTML = reactElemnet.children;
  for (const prop in reactElemnet.props) {
    if (prop === "children") continue;

    domElement.setAttribute(prop, reactElemnet.props[prop]);
  }
  container.appendChild(domElement);
}
const reactElemnet = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "click me to visit google",
};
const mainContainer = document.getElementById("root");

custonRender(reactElemnet, mainContainer);
