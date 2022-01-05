const container = document.querySelector(".container");
async function fetchData() {
    const data = [];
    try {
        const res = await fetch(
            "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        const { products } = await res.json();
        for (let key in products) {
            const mobile = products[key];
            data.push(mobile);
        }
        console.log(data);
        data.sort((first, second) => {
            const firstPopularity = Number(first.popularity);
            const secondPopularity = Number(second.popularity);
            if (firstPopularity > secondPopularity) return -1;
            if (firstPopularity < secondPopularity) return 1;
            return 0;
        });
        data.forEach((eachData) => {
            displayMobileOnScreen(eachData);
        });
    } catch (error) {
        console.error(error);
    }
}
fetchData();

function displayMobileOnScreen(mobile) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const { title, price, popularity, subcategory } = mobile;
    div.className = "mobile";
    h1.innerText = title;
    p.innerHTML = `<strong>Price:</strong> $${price} </br></br> <strong>Popularity:</strong> ${popularity}  </br></br><strong>Subcategory:</strong> ${subcategory}`;
    div.append(h1);
    div.append(p);
    container.append(div);
}
