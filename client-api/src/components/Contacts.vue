<template>
  <div class="container pt-3" id="app" v-cloak>
    <h1>Front Rest API</h1>
    <div>
      <form class="form-inline mb-3" @submit.prevent="createContact">
        <div class="form-group m-2">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            id="name"
            v-model="form.name"
          />
        </div>
        <div class="form-group m-2">
          <input
            type="text"
            class="form-control"
            placeholder="Value"
            id="value"
            v-model="form.value"
          />
        </div>
        <div class="form-group m-2">
          <button class="btn btn-primary" type="submit" :disabled="!canCreate">
            Создать
          </button>
        </div>
      </form>

      <div v-if="contacts.length">
        <div class="card mb-3" v-for="contact in contacts" :key="contact.id">
          <div class="card-body">
            <h5
              class="card-title"
              :style="{ color: contact.marked ? 'red' : 'blue' }"
            >
              {{ contact.name }} - {{ contact.marked }}
            </h5>
            <p>id: {{ contact.id }}</p>
            <p class="card-text">{{ contact.value }}</p>
            <button
              v-if="!contact.marked"
              class="btn btn-primary"
              @click="markContact(contact)"
            >
              Отметить
            </button>
            <button
              v-if="contact.marked"
              class="btn btn-secondary"
              @click="markContact(contact)"
            >
              Отменить
            </button>
            <button class="btn btn-danger" @click="removeContact(contact.id)">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <p v-if="!contacts.length">Контактов пока нет</p>
      <Response v-if="error" :message="message" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Response from './info/response.vue'

export default {
  name: 'Contacts',
  data() {
    return {
      url: '/api/contacts/', // TODO: вынести путь в глобальную переменную. Понять как она использует правильный домен... через path?
      form: {
        name: '',
        value: '',
      },
      contacts: [],
      error: false,
      message: '',
    }
  },
  components: {
    Response,
  },
  async mounted() {
    this.getContacts()
  },
  computed: {
    canCreate() {
      return (this.form.name.length > 1) & (this.form.value.length > 1)
    },
  },
  methods: {
    async getContacts() {
      // TODO: настроить заголовки по умолчанию, чтобы не передавать постоянно
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      try {
        const response = await axios.get(this.url, {
          headers: headers,
        })
        // TODO: оставил как пример без .then .catch
        console.log('getCont', response)
        this.contacts = response.data.contact
        this.error = false
      } catch (error) {
        console.log('ERROR', error)
        this.message = error.message
        this.error = true
      }
    },
    async createContact() {
      const data = {
        name: this.form.name,
        value: this.form.value,
      }
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      await axios
        .post(this.url, data, { headers: headers })
        .then(
          // console.log('RESP', response.data)
          // this.contacts = response.data
          this.getContacts()
        )
        .catch((error) => {
          console.log(error)
        })
      this.form.name = this.form.value = ''
      this.getContacts()
    },
    async removeContact(id) {
      await axios
        .delete(this.url + id)
        .then((response) => {
          console.log('REMOVE', response)
          // this.contacts = response.data.contacts
          this.getContacts()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async markContact(contact) {
      console.log('CON', contact)
      await axios
        .put(this.url + contact.id, {
          marked: !contact.marked,
        })
        .then((response) => {
          console.log('MARK', response)
          // this.contacts = response.data.contacts
          this.getContacts()
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'
</style>
