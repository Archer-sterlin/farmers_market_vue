<template>
    <tr>
        <td>
            <router-link :to="item.product.get_absolute_url">{{  item.product.product_name  }}</router-link>
        </td>
        <td>${{  item.product.price  }}</td>
        <td>
            {{  item.quantity  }}
            <a @click="decrementQuantity(item)">- </a>
            <a @click="incrementQuantity(item)">+</a>
        </td>
        <td>${{  getItemTotal(item).toFixed(2)  }}</td>
        <td><button class="delete" @click="removeFromBasket(item)"></button></td>
    </tr>
</template>

<script>
export default {
    name: 'BasketItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1

            if (item.quantity === 0) {
                this.$emit('removeFromBasket', item)
            }

            this.updateBasket()
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateBasket()
        },
        updateBasket() {
            localStorage.setItem('basket', JSON.stringify(this.$store.state.basket))
        },
        removeFromBasket(item) {
            this.$emit('removeFromBasket', item)

            this.updateBasket()
        },
    },
}
</script>