<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add product</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Category</label>
                        <div class="control">
                            <input type="text" class="input" v-model="category">
                        </div>
                    </div>

                    <div class="field">
                        <label>Product Name</label>
                        <div class="control">
                            <input type="text" class="input" v-model="product_name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Product Price</label>
                        <div class="control">
                            <input type="number" class="input" v-model="price">
                        </div>
                    </div>
                   
                    <div class="field">
                        <label>Quantity</label>
                        <div class="control">
                            <input type="number" class="input" v-model="quantity">
                        </div>
                    </div>

                    <div class="field">
                        <label>Discount</label>
                        <div class="control">
                            <input type="number" class="input" v-model="discount">
                        </div>
                    </div>

                    <div class="field">
                        <label>Delivery Type</label>
                        <div class="control">
                            <input type="text" class="input" v-model="delivery_type">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Add</button>
                        </div>
                    </div>

                    <hr>

                    Or <router-link to="/log-in">click here</router-link> to log in!
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name: 'SignUp',
    data() {
        return {
            product_name: '',
            category:'',
            price: '',
            quantity: 0,
            discount: 0,
            delivery_type: '',
            errors: []
        }
    },
    methods: {
        submitForm() {
            this.errors = []

            if (this.product_name === '') {
                this.errors.push('The product name is missing')
            }

            if (this.price === '') {
                this.errors.push('The price is missing')
            }

            if (this.quantity === '') {
                this.errors.push('The quantity is missing')
            }


            if (this.delivery_type === '') {
                this.errors.push('The delivery type is missing')
            }


            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone_number: this.phone_number,
                    email: this.email,
                    location: this.location,
                    farming_type: this.farming_type,
                }

                axios
                    .post("farmer/crops/", formData)
                    .then(response => {
                        toast({
                            message: 'Crop created',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })

                        this.$router.push('/')
                    })
                    .catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }

                            console.log(JSON.stringify(error.response.data))
                        } else if (error.message) {
                            this.errors.push('Something went wrong. Please try again')
                            
                            console.log(JSON.stringify(error))
                        }
                    })
            }
        }
    }
}
</script>