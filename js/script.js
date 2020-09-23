    let money = document.getElementById("money");
    let display = document.getElementById("display");
    let bills = document.querySelectorAll("img[src$='rub.jpg']");
    let bill_acc = document.getElementById("bill_acc");
    let displayInfo = document.getElementById("displayInfo");
    let balance = document.getElementById("balance");
    let change_box = document.getElementById("change_box");
    let progressBar = document.querySelector(".progress-bar");
    let coffe_mug = document.getElementById("coffe_mug");
    let blocker = document.getElementById("blocker");
    for (let i = 0; i<bills.length; i++){
        bills[i].onmousedown = function(event){
        bills[i].style.position = 'absolute';
        bills[i].style.zIndex=1;
        bills[i].style.top = event.clientY-63+"px";
        bills[i].style.left = event.clientX-150+"px";
        bills[i].style.transform = "rotate(90deg)";

        function moveAt(event){
          bills[i].style.top = event.clientY-63+"px";
          bills[i].style.left = event.clientX-150+"px";
        }

        document.addEventListener("mousemove",moveAt);

        document.onmouseup = function(){
          document.removeEventListener("mousemove", moveAt);
          bills[i].style.zIndex=0;
          
          let bills_top = bills[i].getBoundingClientRect().top;
          let bills_right=bills[i].getBoundingClientRect().right;
          let bills_left =bills[i].getBoundingClientRect().left;
            
          let bill_acc_top = bill_acc.getBoundingClientRect().top;
          let bill_acc_right=bill_acc.getBoundingClientRect().right;
          let bill_acc_left = bill_acc.getBoundingClientRect().left;
          let bill_acc_bottom=bill_acc.getBoundingClientRect().bottom - (bill_acc.height/3)*2;
          
          if (bills_top>bill_acc_top && bills_right<bill_acc_right && bills_left>bill_acc_left && bills_top<bill_acc_bottom){
            bills[i].hidden = true;
            let audio = new Audio ("audio/bankomat.mp3");
            audio.play();
            money.value = +money.value + +bills[i].dataset.denomination;
            balance.innerText = "Ваш баланс: "+money.value+" руб.";
          }
          
          
        };
        bills[i].ondragstart = function(){return false;};
      };
    }
    
    coffe_mug.onclick = function(){
      this.hidden = true;
    };
 
     function getCoffee(coffeeName,cost){
        if (money.value >= cost){
          blocker.style.height = window.innerHeight+"px";
          money.value -= cost;
          balance.innerText = "Ваш баланс: "+money.value+" руб."; 
          let w = 0;
          progressBar.hidden = false;
          let timerId = setInterval(function(){
             progressBar.style.width = (++w)+"%";
             coffe_mug.style.opacity = w/100;
             if(w==105){
               progressBar.hidden = true;
               progressBar.style.width = "0%";
               displayInfo.innerText = `Кофе ${coffeeName} готов!`;
               blocker.style.height = 0+"px";
               clearInterval(timerId);
             }else if (w<40){
               displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> ожидайте...`;
             }else if(w<75){
               displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> ожидайте...`;
             }else{
               displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> ожидайте...`;
             }
          },100);
          let audio = new Audio ("audio/running-water.mp3");
          audio.play();
        }
        else
          displayInfo.innerText = "Недостаточно средств для заказа!";
       }
      
       function getChange(num, isRecursion=false){
          money.value = 0;
          balance.innerText = "Ваш баланс: "+0+" руб.";
          let coin = 0;
          let top = getRandom(0, change_box.offsetHeight-64);
          let left = getRandom(0, change_box.offsetWidth-64);
          if (num>=10) coin = 10;  
          else if(num>=5) coin=5;
          else if(num>=2) coin=2;
          else if(num>=1) coin=1;
          
          if(coin>0){
            change_box.innerHTML += `<img onclick="this.hidden=true" src="img/${coin}rub.png" style="top:${top}px; left:${left}px;">`;
            getChange(num-coin);
            let audio = new Audio ("audio/get_change.mp3");
            audio.play();
          }else if (isRecursion){
          }
        }
      
      function getRandom(min,max){
        return Math.random()*(max-min)+min;
      }