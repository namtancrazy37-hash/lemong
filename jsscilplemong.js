// ข้อมูลเส้น
  const noodleTypes = [
    { name: "เส้นราเมงธรรมดา", price: 0 },
    { name: "เส้นอุด้ง", price: 11 },
    { name: "เส้นโซเมง", price: 11 },
    { name: "เส้นโซบะ", price: 11 }
  ];

  let currentPendingItem = null; // เก็บชั่วคราวระหว่างเลือกเส้น
  let cart = [];

  // แก้ไขฟังก์ชัน addToCart เดิม
  function addToCart(e, itemId) {
    if(e) e.stopPropagation();
    const item = menuItems.find(m => m.id == itemId);

    // ถ้าเป็นหมวดอาหาร (ราเมง) ให้เลือกเส้นก่อน
    if (item.cat === 'food') {
      openModal(item);
    } else {
      // ถ้าเป็นเครื่องดื่มหรือของทานเล่น เพิ่มเข้าตะกร้าได้เลย
      finalizeAdd(item, null, 0);
    }
  }

  function openModal(item) {
    currentPendingItem = item;
    document.getElementById('modalFoodName').textContent = `เลือกเส้นสำหรับ ${item.name}`;
    const container = document.getElementById('noodleOptions');
    
    container.innerHTML = noodleTypes.map((n, index) => `
      <label class="option-item">
        <span>
          <input type="radio" name="noodle" value="${index}" ${index === 0 ? 'checked' : ''}>
          ${n.name}
        </span>
        <span style="color: var(--orange)">+฿${n.price}</span>
      </label>
    `).join('');

    document.getElementById('noodleModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('noodleModal').style.display = 'none';
    currentPendingItem = null;
  }

  function confirmAddToCart() {
    const selectedIndex = document.querySelector('input[name="noodle"]:checked').value;
    const selectedNoodle = noodleTypes[selectedIndex];
    
    finalizeAdd(currentPendingItem, selectedNoodle.name, selectedNoodle.price);
    closeModal();
  }

  function finalizeAdd(item, noodleName, extraPrice) {
    const finalPrice = item.price + extraPrice;
    const cartItemName = noodleName ? `${item.name} (${noodleName})` : item.name;

    // Logic เพิ่มลง Array ตะกร้า
    cart.push({
      name: cartItemName,
      price: finalPrice,
      quantity: 1
    });

    // อัปเดต UI
    const totalItems = cart.length;
    document.getElementById('cartCount').textContent = totalItems;
    showToast(`เพิ่ม "${cartItemName}" ฿${finalPrice} แล้ว 🛒`);
  }