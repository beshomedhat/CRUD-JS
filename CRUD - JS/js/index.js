let productNameInp = document.getElementById("productNameInp")
let productPriceInp = document.getElementById("productPriceInp")
let productCompanyInp = document.getElementById("productCompanyInp")
let productDescInp = document.getElementById("productDescInp");

let addBtn = document.getElementById("addBtn");

let productsContainer ;
if(localStorage.getItem("productsContainer")==null)
    {
        productsContainer = [];
    }
else
    {
        productsContainer = JSON.parse(localStorage.getItem("productsContainer"));
        displayProduct();
    }


addBtn.onclick = function(){
    
    $("#updateBtn").css({opacity:"0"});
    document.getElementById("inputHeader").innerHTML="Add Product";
    if(checkValidation()==true)
        {
            addPrpduct();
            displayProduct(); 
            clearForm();
        }
    
    
}
//---------------------ADD FUNCTION----------------------------------
function addPrpduct()
{
   let product = {
       name: productNameInp.value ,
       price: productPriceInp.value , 
       company: productCompanyInp.value , 
       desc: productDescInp.value 
   } 
    productsContainer.push(product);
    localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
}
//----------------------------------------------------------------------
//---------------------DISPLAY FUNCTION---------------------------------
function displayProduct()
{
    let colls="";
    for(let i=0; i<productsContainer.length; i++)
        {
            colls+=`<div class="col-md-3 text-center p-2">
                        <div class="border p-2">
                            <h3 class="text-danger">${productsContainer[i].name}</h3>
                            <p style="color: darkgray">${productsContainer[i].desc}</p>
                            <p style="color: coral">${productsContainer[i].company}</p>
                            <p style="color: coral">${productsContainer[i].price} Egp</p>
                            <button class="btn btn-danger mx-1" onclick="deleteProduct(${i})">Delete</button>
                            <button class="btn btn-primary mx-1" onclick="updateProduct(${i})">Update</button>
                        </div>
                    </div>`
        }
    document.getElementById("rowData").innerHTML=colls;
}
//-------------------------------------------------------------------------

//----------------------------------------------------------------------
//---------------------DELETE FUNCTION---------------------------------
function deleteProduct(id)
{
    productsContainer.splice(id,1);
    localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    displayProduct();
    searchProduct(searchNameInp.value)
}
//----------------------------------------------------------------------

//---------------------UPDATE FUNCTION---------------------------------
function updateProduct(id)
{
    productNameInp.value = productsContainer[id].name;
    productPriceInp.value = productsContainer[id].price;
    productCompanyInp.value = productsContainer[id].company;
    productDescInp.value = productsContainer[id].desc;
    
    $("#updateBtn").css({opacity:"1"});
    document.getElementById("inputHeader").innerHTML="Update Product";
    let updateBtn = document.getElementById("updateBtn");
    updateBtn.onclick = function()
    {
        if(checkValidation()==true)
            {
                        saveUpdate(id);
        
                        localStorage.setItem("productsContainer",JSON.stringify(productsContainer));

                        $("#updateBtn").css({opacity:"0"});
                        document.getElementById("inputHeader").innerHTML="Add Product";

                        clearForm();
                        displayProduct(); 
                        searchProduct(searchNameInp.value)
            }

    }

    
}
function saveUpdate(id)
{
    productsContainer[Number(id)].name = productNameInp.value;
    productsContainer[Number(id)].price = productPriceInp.value;
    productsContainer[Number(id)].company = productCompanyInp.value;
    productsContainer[Number(id)].desc = productDescInp.value;
    
}
//----------------------------------------------------------------------

//---------------------CLEAR INPUT FUNCTION---------------------------------
function clearForm()
{
    productNameInp.value = "";
    productPriceInp.value = "";
    productCompanyInp.value = "";
    productDescInp.value = "";
}
//----------------------------------------------------------------------

//---------------------SEARCH FUNCTION---------------------------------
let searchNameInp = document.getElementById("searchNameInp");

searchNameInp.onkeyup=function(){
    $("#updateBtn").css({opacity:"0"});
    $("#error").css({display:"none"});
    document.getElementById("inputHeader").innerHTML="Add Product";
    clearForm();
    searchProduct(searchNameInp.value)
}


function searchProduct(searchValue)
{
    let colls ="";
    if(searchNameInp.value != "")
        {
            for(let i=0; i<productsContainer.length; i++)
                {
                    if(productsContainer[i].name.includes(searchValue))
                        {
                            colls+=`<div class="col-md-3 text-center p-2">
                                        <div class="border p-2">
                                            <h3 class="text-danger">${productsContainer[i].name}</h3>
                                            <p style="color: darkgray">${productsContainer[i].desc}</p>
                                            <p style="color: coral">${productsContainer[i].company}</p>
                                            <p style="color: coral">${productsContainer[i].price} Egp</p>
                                            <button class="btn btn-danger mx-1" onclick="deleteProduct(${i})">Delete</button>
                                            <button class="btn btn-primary mx-1" onclick="updateProduct(${i})">Update</button>
                                        </div>
                                    </div>`
                        }
                }
            document.getElementById("searchData").innerHTML=colls;
        }
    else
        {
            document.getElementById("searchData").innerHTML="";
        }
    
}
//----------------------------------------------------------------------

//----------------------------CHECK VALIDATION--------------------------
function checkValidation()
{
    $("#error").css({display:"block"})
    let name = /^[A-Z][a-zA-Z0-9 ]{2,9}$/;
    let price = /^[1-9][0-9]{1,5}$/;
    let company = /^[a-zA-Z0-9 ]{2,10}$/;
    let colls="";
    if(name.test(productNameInp.value)==false)
        {
            $("#error").css({display:"block"})
            colls ="<p>productName must start with upperCase and be at least 3 letters</p>"
            document.getElementById("error").innerHTML=colls;
            return false;
        }
    else if(price.test(productPriceInp.value)==false)
        {
            $("#error").css({display:"block"})
            colls ="<p>productPrice must be a number and be from 1 to 999999</p>"
            document.getElementById("error").innerHTML=colls;
            return false;
        }
    else if(company.test(productCompanyInp.value)==false)
        {
            $("#error").css({display:"block"})
            colls ="<p>productCompany must be a name at least 2 letters</p>"
            document.getElementById("error").innerHTML=colls;
            return false;
        }
    else if(productDescInp.value=="")
        {
            $("#error").css({display:"block"})
            colls ="<p>productDescription must be words</p>"
            document.getElementById("error").innerHTML=colls
            return false;
        }
    else
        {
            $("#error").css({display:"none"});
            return true;
        }
}


//----------------------------------------------------------------------