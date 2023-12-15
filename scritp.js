(async ()=>
{
   const productContainer = document.getElementById("productContainer");
    const searchInput= document.getElementById("searchInput");
    const url = "https://fakestoreapi.com/products";
    const fetchProduct = async ()=> {
        try{
             const response = await fetch(url);
             const data= await response.json();
             return data;
             console.log(data);
        }
        catch(error){
            return error;
        }

    }
    const products = await fetchProduct();
    console.log(products);
    const generateProducts = (product) => {
        return `<div class="product_card">	
          <div class="image_container">	
            <img	
              src="${product.image}"	
              alt=""	
            />	
          </div>	
          <div class="product_content">	
            <h2>	
             ${product.title}	
            </h2>	
            <p>	
             ${product.description.split(" ").slice(0, 20).join(" ")}	
            </p>	
            <button>${product.price} $</button>	

            </div>	
        </div>`;
      };
      const renderProducts = (products) => {
        productContainer.innerHTML = "";
        products.forEach((product) => {
          productContainer.innerHTML += generateProducts(product);
        });
      };
    renderProducts(products);
    // Search functionality
    const checkProduct = (text, searchText) => {
        return text.toString().toLowerCase().includes(searchText);
      };

      
searchInput.addEventListener('keyup',function(e)
{
    const searchText = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) => {
      return (
        checkProduct(product.description, searchText) ||
        checkProduct(product.title, searchText) ||
        checkProduct(product.price, searchText)
      );
    });
    renderProducts(filteredProducts);
  });
  renderProducts(products)
})();

