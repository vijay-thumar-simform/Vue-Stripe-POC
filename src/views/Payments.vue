<template>
    <context-holder />
    <div>
        Payment page
    </div>
    <div v-if="allPayments.length > 0">
        <a-table :dataSource="allPayments" :columns="columns">
            <template #bodyCell="{ column, record }">
                <span v-if="column.title == 'Action'">
                    <button @click="refund(record.id)">Refund</button>
                </span>
                <span v-if="column.title == 'ID'">
                    {{ record.id.slice(-9) }}
                </span>
                <span v-if="column.title == 'Amount'">
                    {{ record.amount / 100 }}
                </span>
                <span v-if="column.title == 'Status'">
                    {{ record.paid === true && record.refunded === true ? 'refunded' : record.paid === true &&
                        record.refunded === false ? 'paid' : 'failed' }}
                </span>
            </template>
        </a-table>

        <!-- <div v-for="payment of allPayments">
            {{ payment }}
        </div> -->
    </div>
    <div v-else>
        Please wait there are no payment now!
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// import { store } from "../store/store.js";
import { store } from "../store/store.js";
import { message } from 'ant-design-vue';
const [messageApi, contextHolder] = message.useMessage();
const storeData = store();

const secKey = import.meta.env.VITE_STRIPE_PRIVATE_KEY
// const storeData = store();
const allPayments = ref<any>([])
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    // {
    //     title: 'Age',
    //     dataIndex: 'age',
    //     key: 'age',
    // },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true
    },
    // description
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'id',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'id',

    }
]


const getAllPayments = () => {
    const apiKey = secKey;

    // Define the URL for the API endpoint
    // const apiUrl = 'https://api.stripe.com/v1/products'; // all products
    const apiUrl = 'https://api.stripe.com/v1/charges'; // all payments

    // Define the data parameters as an object
    const data = {
        limit: 100
    };

    // Create a URLSearchParams object to encode the data as query parameters
    // const params = new URLSearchParams(data);

    // Create a request object with headers for basic authentication
    const headers = new Headers({
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Make the Fetch GET request
    fetch(`${apiUrl}?${data}`, {
        method: 'GET',
        headers: headers,
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log('Response data:', data);

            const allData = data.data.map(({ ...item }) => {
                console.log(item)
                // item.amount = item.amount / 100
                // item.paid === true && item.refunded === true ? item.status = 'refunded' : item.status = item.status
                // item.id = item.id.slice(-9);
                return item
            })
            storeData.setPayments(allData)
            allPayments.value = allData
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}

const refund = (charge: string) => {
    console.log(charge)
    const headers = {
        'Content-Type': 'application/json',
    };
    const data = {
        charge
    }
    const url = 'http://localhost:1234/refund-payment'
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).then((res) => {
        console.log({ res })
        const expectedError = 'does not have a successful charge to refund.'
        console.log('error string', res.error.slice(-44))
        if (res?.error?.slice(-44) == expectedError) {
            message.error("This is failed payment you can't initiate refund for this!")
        } else if (res?.error) {
            messageApi.error('This payment is already been refunded');
        } else {
            messageApi.success('Your refund has been initiated!');
        }
        getAllPayments()
    }).catch((err) => {
        console.log({ err })
        messageApi.error('Something went wrong please try again');
        getAllPayments()
    })
}

onMounted(async function () {
    getAllPayments()
})
</script>