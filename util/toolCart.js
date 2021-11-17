module.exports = {
    cart: function (oldCart) {
        this.items = oldCart.items || [];
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;

        this.add = function (item, id, qty, size) {

            let arrayItems = this.items;
            let flag = true;
            arrayItems.map(function (item) {
                if (item.id == id && item.size == parseInt(size)) {
                    item.qty += parseInt(qty);
                    item.price = item.qty * parseInt(item.product.costNew);
                    flag = false;
                }
            })
            if (flag == true) {
                const itemData = {
                    id: id,
                    product: item,
                    qty: parseInt(qty),
                    size: parseInt(size),
                    price: parseInt(item.costNew) * parseInt(qty)
                }
                arrayItems.push(itemData);
            }
            let totalQtyArray = 0;
            let totalPriceArray = 0;
            arrayItems.map(function (item) {
                totalQtyArray += item.qty;
                totalPriceArray += item.price;
            })
            this.totalQty = totalQtyArray;
            this.totalPrice = totalPriceArray;

        }
        this.generateArray = function () {
            return this.items;
        }
        this.removeItemCart = function (id, size) {
            let priceItemRemove = 0;
            let qtyItemRemove = 0;
            let arrayItems = this.items;
            arrayItems.map(function (item, index) {
                if (item.id == id && item.size == size) {
                    qtyItemRemove = item.qty;
                    priceItemRemove = item.price;
                    arrayItems.splice(index, 1);
                }
            })
            this.items = arrayItems;
            this.totalPrice -= priceItemRemove;
            this.totalQty -= qtyItemRemove;
        }
    }
}
