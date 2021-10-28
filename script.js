window.onload = function () {
    var add = document.getElementById('addUser');
    var myform = document.getElementById('myForm');
    var dynamicHere = document.getElementById('dynamicHere');
    var container = document.getElementsByClassName('container')[0];
    
    myform.style.display="none";

    add.addEventListener('click',function () {
        myform.style.display="block";
        add.style.display="none";
    })

    myform.addEventListener('submit', function (e) {
        e.preventDefault();
        myform.style.display="none";
        add.style.display="inline-block";
        var nom = document.getElementById('nom').value;
        var contact = document.getElementById('contact').value;
        var email = document.getElementById('email').value;
        
        if (nom == '' || contact == '' || email == '') 
        {
            alert('✖ Tous les champs doivent être remplis');
            return;
        } 
        
        else
        {
            var user = new User(nom, contact, email);
        
            UI.displayData(user);
            Store.setStored(user);

            UI.clearFields();
            UI.messages('✔ Enregistrer', 'succes'); 
        }
      
   })

   dynamicHere.addEventListener('click', function(e) 
   {
      //(e.target.classList.contains('close'));  
        UI.removeRow(e.target);
   })
    ///
    class User 
    {
        constructor(nom, contact, email)
        {
            this.nom = nom
            this.contact = contact
            this.email = email
        }
    }
    ///

    class UI{
       static clearFields()
       {
            document.getElementById('nom').value = '';
            document.getElementById('contact').value = '';
            document.getElementById('email').value = '';
        }

        static displayData(user) 
        {
            //get value from localStorage here
            let users = Store.getStored();
            users.push(user);
            UI.PopulateRow(users);
        }

        static PopulateRow(users)
        {   
            //clear table before inserting
             while (dynamicHere.firstChild) 
             {
                dynamicHere.firstChild.remove(dynamicHere.firstChild);
             }
            //array 
            users.forEach(onebyone =>
            {
                dynamicHere.innerHTML += 
                 `<tr class="infoBox">
                    <td class="photo">
                    ${onebyone.email}
                    </td>
                    <td class="info">
                        ${onebyone.nom}
                        <br>
                        ${onebyone.contact}
                        <br>
                        <span>${onebyone.email}</span>
                    </td>
                    <td><button class="close"></button></td>
                </tr>`
            })

            
        }

        static messages(txt,className)
        {
            let div = document.createElement('div');
            div.className = `${className}`;
            div.innerText = txt;
            container.insertBefore(div, myForm);

            setTimeout(function (){
                div.remove();
            },1000);
        }

        static removeRow(element)
        {
            if (element.classList.contains('close')) 
            {   
                let email = element.parentElement.parentElement.firstElementChild.innerText;
                Store.removeStoredValue(email);
                element.parentElement.parentElement.remove();
                UI.messages('✖ Supprimer', 'delete'); 
            }
        }

    }

    class Store
    {
        static getStored()
        {
            let user = '';
           if (localStorage.getItem('user') == null) 
           {
                user = [];
           } 
           else
           {
                user = JSON.parse(localStorage.getItem('user'));
           }
           return user;
        }

        static setStored(obj)
        {
            let userFromLocal = Store.getStored();
            userFromLocal.push(obj);
            localStorage.setItem('user',JSON.stringify(userFromLocal));
        }

        static removeStoredValue(email)
        {
            let ALLusers = Store.getStored();
            ALLusers.forEach(function(onebyone,index)
            {
                if(onebyone.email == email)
                {
                    ALLusers.splice(index, 1);
                }
                
            })
            localStorage.setItem('user',JSON.stringify(ALLusers));
        }
    }

    UI.PopulateRow(Store.getStored());
   // window onload ends
}