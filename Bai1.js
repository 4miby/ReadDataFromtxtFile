// Đường dẫn đến file txt
const filePath = './Products.txt';
let productsHTML = '';
// Sử dụng fetch để đọc nội dung từ file
fetch(filePath)
  .then(response => response.text())
  .then(data => {
    // Tách dữ liệu thành mảng các dòng
    const lines = data.split('\n');

    // Lặp qua từng dòng
    lines.forEach(line => {
      // Tách dữ liệu trong mỗi dòng bằng dấu |
      const elements = line.split('|');

      // Kiểm tra nếu có đủ số lượng phần tử
      if (elements.length === 7) {
        // Lấy thông tin từng phần tử
        const id = elements[0];
        const name = elements[1];
        const price = elements[2];
        const brand = elements[3];
        const quantity = elements[4];
        const description = elements[5];
        const imageUrl = elements[6];
        productsHTML+=`
        <tr>
          <th>${id}</th>
          <th>
            <div style="display:flex;">
              <img src='.${imageUrl}' width="100px" height="100px">
              <div style="margin-left: 20px;">
                <h4 style="margin-bottom: 20px;
                color: brown;
                ">${name}</h4>
                <p>${description}</p>
              </div>
            </div>
         </th>
          <th>${price}</th>
          <th>
            <p data-quantity=${quantity} class="number"></p>
            (${quantity})
          </th>
          <th>${brand}</th>
          <th class="Note" data-quantity=${quantity}>Thêm vào giỏ hàng</>
        </tr>`
      }
      document.querySelector('.table-body').innerHTML=productsHTML;
    }); 
    document.querySelectorAll(".number").forEach((quantity)=>
      {
        let number = quantity.dataset.quantity;
        console.log(number);
        if(number==0)
        {
          quantity.textContent="Hết hàng";
          quantity.style.color="red";
        }
        else{
          quantity.textContent= "Còn hàng";
        }
      })
      document.querySelectorAll(".Note").forEach((quantity)=>
      {
        let number = quantity.dataset.quantity;
        console.log(number);
        if(number!=0)
        {
          quantity.style.color="blue";
        }
      })
  })
  .catch(error => console.error('Lỗi khi đọc file:', error));


