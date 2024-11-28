
const bar = document.querySelector("#bar");
const button = document.querySelector("#button");


document.addEventListener('DOMContentLoaded', () => {
    names.then((data) => {
        for (let i = 1; i <= 5; i++) {
            const description = document.querySelector(`#a${i}`);
            const random = Math.random();
            description.textContent = data.name[Math.floor(random * data.name.length)];
            console.log(description.textContent);
            
        }
        const main = document.querySelector('main');
        const themain = main.innerHTML;
        const homebutton = document.querySelector('#Home');
        homebutton.addEventListener('click', () =>{
        main.innerHTML = themain;
       
    });
    
} )
    
});






const Dinonarybutton = document.querySelector("#Dinonary");


async function getData(Name){
    const url = `https://www.nhm.ac.uk/discover/dino-directory/${Name.toLowerCase()}.html`;
    console.log("Fetching URL: ", `http://localhost:3000/scrape?url=${encodeURIComponent(url)}`);
    const response = await fetch(`http://localhost:3000/scrape?url=${url}`);
    const data = await response.json();
    image = data;

    if(response.ok){
        console.log(data);
        const hehediv = document.querySelector("#hehediv");
        hehediv.innerHTML = '';
        const div1 = document.createElement("div");
        const div2 = document.createElement('div');
        div2.style.width = '400px';
        div2.style.height = '400px';
        const img = document.createElement('img');
        img.style.borderRadius = "10px";
        img.style.width = '40em';
        img.setAttribute('src', `https://www.nhm.ac.uk/${data.link}`);
        console.log(img.src);
        const title = document.createElement('h1');
        title.style.fontSize = '4em';
        title.style.fontFamily = '\'Courier New\', Courier, monospace';
        title.style.marginLeft = "0.5em";
        title.textContent = data.realtitle;
        
        const details = document.createElement('ul');
        details.style.listStyleType = 'none';
        const type = document.createElement('li');
        const length = document.createElement('li');
        const diet = document.createElement('li');
        const time = document.createElement('li');
        const found = document.createElement('li');
        const lists = [ 1,2, type, length, diet, time, found];
        for(let i = 2; i < data.detailname.length - 3; i ++) {
            console.log(lists[i]);
            lists[i].textContent = `${data.detailname[i]} ${data.detailcontent[i]}`;
            lists[i].style.fontSize = '2em';
            lists[i].style.fontFamily = `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif`;
            details.appendChild(lists[i]);
            
        }
        details.style.display = 'inline-block';
        // infodiv.style.display = 'inline';
        //const svg1 = document.createElement("svg");
        //const svg2 = document.createElement("svg");
        //const path1 = document.createElement("path");
        //path1.setAttribute('d', data.dinoAttribute);
        //const path2 = document.createElement("path");
        //path2.setAttribute('d', data.humanAttribute);
        //path1.setAttribute("fill", "#AAAAAA");
        //path2.setAttribute("fill", "#AAAAAA");
        //svg1.style.width = "400px";
        //svg1.style.height = "400px";
        //svg2.style.width = "400px";
        ///svg2.style.height = "400px";
        //svg1.setAttribute("viewBox", "0 0 400 400");
        //svg2.setAttribute("viewBox", "0 0 400 400");
        
        // svg1.appendChild(path1);
        // svg2.appendChild(path2);
        // div2.appendChild(svg1);
        // div2.appendChild(svg2);
        // div1.appendChild(div2);
        const div3 = document.createElement('div');
       
        if(data.firstdescription) {
            const p1 = document.createElement('p');
            p1.textContent = data.firstdescription;
            div3.appendChild(p1);
            if(data.seconddescription) {
                const p2 = document.createElement('p');
                p2.textContent = data.seconddescription;
                div3.appendChild(p2);
            }
        }
       
        div1.appendChild(img);
        div1.style.display = 'inline-block';
        
        hehediv.appendChild(title);
        hehediv.appendChild(div1);
        hehediv.appendChild(details);
        if(!div3.innerHTML === ''){
            hehediv.appendChild(div3);
        }
        const taxonomydiv = document.createElement('div');
        const taxonomy = document.createElement('h2');
        taxonomy.textContent = 'Taxonomic details';
        taxonomy.style.fontSize = '3em';
        taxonomy.style.marginLeft = '0.5em';
        taxonomy.style.fontFamily = `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif`;
        taxonomydiv.appendChild(taxonomy);
        const taxonomylist = document.createElement('ul');
        taxonomylist.style.listStyleType = 'none';
        const taxonomydet = document.createElement('li');
        const namedby = document.createElement('li');
        const typespecies = document.createElement('li');
        const taxonomyname = data.detailname.slice(7, 10);
        const taxonomydetails = data.detailcontent.slice(7,10);
        const taxlist = [taxonomydet,namedby, typespecies];
        for(const item of taxlist){
            item.textContent = `${taxonomyname[taxlist.indexOf(item)]} ${taxonomydetails[taxlist.indexOf(item)]}`;
            taxonomylist.appendChild(item);
            item.style.fontSize = '2em';
            item.style.fontFamily = `"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif, italic`;
        }
        taxonomydiv.appendChild(taxonomylist);
        hehediv.appendChild(taxonomydiv);



        
    } else {
        console.error(data.error);
    }
}

// getData('Aardonyx');
async function getList(){
    const url = `https://www.nhm.ac.uk/discover/dino-directory/name/name-az-all/gallery.html`;
    console.log("Fetching URL: ", `http://localhost:3000/getList?url=${encodeURIComponent(url)}`);
    const response = await fetch(`http://localhost:3000/getList?url=${url}`);
    const data = await response.json();
    return data;
}

const names = getList();

Dinonarybutton.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.innerHTML = '';
    const navigation = document.createElement("div");
    navigation.style.width = "90%";
    navigation.style.margin = "auto";
    navigation.style.display = "flex"
    navigation.style.flexWrap = "wrap";
    navigation.style.justifyContent = "center";
    const letterarray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    for(const letter of letterarray){
        const reference = document.createElement("a");
        
        reference.setAttribute("href", "#" + letter);
        reference.textContent = letter;
        reference.style.fontSize = "20px"
        reference.style.fontFamily = "'Courier New', Courier, monospace";
        reference.style.fontWeight = "bold";
        reference.style.margin = "20px";
        
        navigation.appendChild(reference);

    }
    
    main.appendChild(navigation);
    const div = document.createElement("div");
    div.setAttribute("id", "hehediv");
    div.style.border = "20px solid rgb(150, 150, 150)";
    div.style.borderRadius = "10px"
    div.style.marginBottom = "20px";
    div.style.width = "80%"
    div.style.margin = "auto"
    div.style.backgroundColor = "rgb(150, 150, 150)";
    const list = document.createElement("ul");
    list.style.listStyleType = "none";
    div.appendChild(list);
    main.appendChild(div);
    
    names.then((data) => {
        let firstletter = data.name[0][0];
        const Seperator = document.createElement('li');
        Seperator.textContent = firstletter;
        Seperator.setAttribute("id", firstletter);
        Seperator.style.fontSize = "40px";
        Seperator.style.fontFamily = "'Courier New', Courier, monospace";
        Seperator.style.fontWeight = "bold";
        list.appendChild(Seperator);
        for (const item of data.name) {
            if(item[0] === firstletter){
                const lielement = document.createElement("li");
                const anchor = document.createElement('a');
                lielement.appendChild(anchor);
                anchor.textContent = `${item}`;
                anchor.setAttribute("id", item.toLowerCase());
                anchor.style.fontSize = "20px";
                anchor.style.fontFamily = "sans-serif";
                anchor.style.fontWeight = "500";
                anchor.style.textDecoration = "underlined";
                anchor.style.color = "black";
                anchor.style.textDecorationColor = "grey";
                anchor.addEventListener("click", () => {

                })
                lielement.setAttribute("id", item.toLowerCase());
                list.appendChild(lielement);
                anchor.addEventListener("click", () => {
                    getData(anchor.getAttribute("id"));    
                })
            }

            else {
                firstletter  = item[0];
                const Seperator = document.createElement("li");
                Seperator.textContent = firstletter;
                Seperator.setAttribute("id", firstletter);
                Seperator.style.fontSize = "40px";
                Seperator.style.fontFamily = "'Courier New', Courier, monospace";
                Seperator.style.fontWeight = "bold";
                list.appendChild(Seperator);
                const lielement = document.createElement("li");
                const anchor = document.createElement('a');
                lielement.appendChild(anchor);
                const name = document.createElement('b');
                name.textContent = `${item}:`;
                anchor.appendChild(name);
                anchor.setAttribute("id", item.toLowerCase());
                anchor.style.fontSize = "20px";
                anchor.style.fontFamily = "sans-serif";
                anchor.style.fontWeight = "500";
                anchor.style.textDecoration = "underlined";
                anchor.style.color = "black"
                anchor.style.textDecorationColor = "grey";
                lielement.setAttribute("id", item.toLowerCase());
                list.appendChild(lielement);
            }
            
        }

    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    })
    
    button.addEventListener("click", () =>{
        promise.then((data) => {
            const namearray = [];
        for(const item of data){
            namearray.push(item.Name.toLowerCase());
        }
        const value = bar.value.toLowerCase();
        if(value === ''){
            window.alert("nothing to be searched");
            return;
        }

        if(namearray.indexOf(value) === -1){
            window.alert("no such dinosaur, make sure the spelling is correct");
            bar.value = '';
            return;
        }
        else {
            if(value[value.length - 1] === ' '){
                const targetElement = document.getElementById(value.slice(0, value.length - 1));
                targetElement.scrollIntoView({behavior: 'smooth', block: 'center', });
                targetElement.classList.add("highlight");
                bar.value = '';
                setTimeout(() => {
                    targetElement.classList.remove("highlight");
                }, 1000)
            }
            const targetElement = document.getElementById(value);
            targetElement.scrollIntoView({behavior: 'smooth', block: 'center'});
            targetElement.classList.add("highlight");
            bar.value = '';
            setTimeout(() => {
                targetElement.classList.remove("highlight");
            }, 1000)
            

        }
    
        })
        
    })
        
        

        
    
})