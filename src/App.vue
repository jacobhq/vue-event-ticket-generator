<template>
  <div id="app">
    <div class="onboarding" v-show="onboarding">
      <section v-show="one">
        <div class="wrapper">
          <p class="tagline">👋 Hello and</p>
          <h1 class="welcome">Welcome</h1>
          <div class="cta">
            <button v-on:click="next">Begin</button>
          </div>
        </div>
      </section>
      <section v-show="two">
        <div class="wrapper">
          <p class="tagline">🎫 About your</p>
          <h1 class="welcome">Event</h1>
          <form class="tickets-form onboard-form">
            <input v-model="eventName" placeholder="Enter Event Name" v-validate="{required: true, maxLength: 11}" />
            <input v-model="eventOrganizer" placeholder="Enter Event Organiser" />
            <input v-model="eventPrice" placeholder="Enter Event Price" />
          </form>
          <div class="cta">
            <button v-on:click="finish">Make tickets</button>
          </div>
        </div>
      </section>
      <section v-show="three">
        <div class="wrapper">
          <p class="tagline">✨ Look at your shiny new</p>
          <h1 class="welcome">Ticket</h1>
          <ul class="tickets-list center">
            <li v-for="ticket in tickets" :key="ticket.id">
              <div class="ticket-wrapper">
                <Ticket :event="event" :ticket="ticket" style="box-shadow: black 0px 0px 5px;" />
              </div>
            </li>
          </ul>
          <div class="cta">
            <button v-on:click="next">Begin</button>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div class="tickets-control no-print">
        <form class="tickets-form">
          <label>Enter Event Name</label>
          <input v-model="eventName" placeholder="Eg: Vue.js Workshop" v-validate="{required: true, maxLength: 11}" />
          <label>Enter Event Organiser</label>
          <input v-model="eventOrganizer" placeholder="Eg: Mozilla Bbsr" />
          <label>Enter Event Price</label>
          <input v-model="eventPrice" placeholder="Eg: 20" />
        </form>
        <div>
          <p>
            Fill the event details in the form. 
            <br />If you like the generated
            tickets then click on Print button.
          </p>
          <button v-on:click="generateTickets">Print Tickets
          </button>
          <button v-on:click="addTicket">Add ticket
          </button>
          <button v-on:click="rmTicket">Delete ticket
          </button>
        </div>
      </div>
      <ul class="tickets-list">
        <li v-for="ticket in tickets" :key="ticket.id">
          <div class="ticket-wrapper">
            <Ticket :event="event" :ticket="ticket" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Ticket from "./components/Ticket";
  import {
    customAlphabet }
  from "nanoid";
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
  export default {
    name: "App",
    components: {
      Ticket,
    }
    ,
    data() {
      return {
        onboarding: true,
        one: true,
        two: false,
        three: false,
        eventName: null,
        eventOrganizer: null,
        eventPrice: null,
        tickets: [
          {
            id: "DTK-" + nanoid(),
          }
          ,
        ],
      };
    }
    ,
    computed: {
      event() {
        const event = {
          name: this.eventName,
          organiser: this.eventOrganizer,
          price: this.eventPrice,
        };
        return event;
      }
      ,
    }
    ,
    methods: {
      generateTickets() {
        window.print();
      },
      addTicket() {
        this.tickets.push({
          id: "DTK-" + nanoid()
          }
        );
      },
      rmTicket() {
        this.tickets.splice(1, 1);
      },
      next() {
        this.one = false,
        this.two = true
      },
      finish() {
        this.two = false,
        this.three = true
      }
    },
  };
</script>
<style>
  body,
  ul,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .tickets-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
  }
  .tickets-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .tickets-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .ticket-wrapper {
    width: 340px;
    padding: 5px;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      background-color: white;
    }
    .no-print,
    .no-print * {
      display: none !important;
    }
  }
  input {
  display: block;
  margin: auto;
  outline: 0;
  border: 1px solid grey;
  font-size: 1.1em;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.3s ease;
  box-shadow: #20fc8e5e 0 0 0px 0px;
}

.valid { border: 1px solid #009688; }

.invalid { border: 1px solid #F44336; }

label {
  display: block;
  text-align: center;
  font-family: sans-serif;
  margin: 7px 0px 5px;
}

input:focus {
  border: 1px solid #20fc8f;
  box-shadow: #20fc8e5e 0 0 0px 3px;
}

button {
  background-color: #20fc8f;
  border: none;
  margin: 3px;
  padding: 7px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: #20fc8e5e 0 0 0px 0px;
  transition: all 0.3s ease;
  color: #0b3954;
}

button:focus {
  box-shadow: #20fc8e5e 0 0 0px 3px;
  border: none;
  outline: none;
}

.onboarding {
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #0b3954;
}

.welcome {
  color: #20fc8f;
  font-size: 8rem;
}
.tagline {
  font-family: monospace;
  color: #20fc8f;
  font-size: 2rem;
}
.wrapper {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.cta button {
  padding: 20px;
  font-size: 1.25rem;
  font-weight: 700;
}

.onboard-form input {
  margin-left: 2px;
  margin-bottom: 6px;
  width: 100%;
  border: none !important;
  border-bottom: #20fc8f 1px solid !important;
  border-radius: 0;
  background-color: #0b3954;
  color: white;
}

.onboard-form input:focus {
  box-shadow: none;
  border-bottom: #20fc8f 3px solid !important;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center
}
</style>
