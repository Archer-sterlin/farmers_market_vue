<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Basket</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="basketTotalLength">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <BasketItem
                            v-for="item in basket.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromBasket="removeFromBasket" />
                    </tbody>
                </table>

                <p v-else>You don't have any products in your basket...</p>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Summary</h2>

                <strong>${{ basketTotalPrice.toFixed(2) }}</strong>, {{ basketTotalLength }} items

                <hr>

                <router-link to="/basket/checkout" class="button is-dark">Proceed to checkout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BasketItem from '@/components/BasketItem.vue'

export default {
    name: 'Basket',
    components: {
        BasketItem
    },
    data() {
        return {
            basket: {
                items: []
            }
        }
    },
    mounted() {
        this.basket = this.$store.state.basket
    },
    methods: {
        removeFromBasket(item) {
            this.basket.items = this.basket.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        basketTotalLength() {
            return this.basket.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        basketTotalPrice() {
            return this.basket.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>