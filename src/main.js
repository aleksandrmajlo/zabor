import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VTooltip from "v-tooltip";
Vue.use(VTooltip);



import numFormat from 'vue-filter-number-format';
Vue.filter('numFormat', numFormat);

Vue.config.productionTip = false;

new Vue({
  el: "#calc",
  store,
  components: {},
  data: {
    model:{
      dlina: "",
      vysota: "",
      tip_pokrytiia: "",

      tolshchina: "",

      shirina_vorot: "",
      kol_vorot: "",
      kol_kalitok: "",
      shosse: "",
      distance: ""
    },
  
    isErrordlina: false,
    isErrorvysota: false,    
    isErrortip_pokrytiia: false,   
    isErrortolshchina: false,
    // нажатие на кнопку расчитать
    calcClick: false,

    pdfDisabled:false,
    pdfText: "Распечатать расчет",

    link:""

  },
  computed: {

    vysota_text(){
      return parseFloat(this.model.vysota.replace(',', '.'))+1; 
    },
    // ошибка количество ворот не выбрано
    vorotRelationsCount(){
      if(this.calcClick){
            if(this.model.shirina_vorot!=="" && this.model.kol_vorot==""){
               return true;
            }else{
              return false;
            }
        }else{
           return false;
        }
    },
    // ошибка ширина ворот не выбрана
    vorotRelationsShirina(){
      if(this.calcClick){
            if(this.model.shirina_vorot=="" && this.model.kol_vorot!==""){
               return true;
            }else{
              return false;
            }
        }else{
           return false;
        }
    },
    
  },
  mounted() {
    this.$store.dispatch("getItems");
  },
  methods: {
    test() {
      this.$store.dispatch("getItems");
    },
    validate() {
      let b = true;

      // длина
      if(this.isNumeric(this.model.dlina)&&parseInt(this.model.dlina)>19){
        this.isErrordlina= false;
      }else{
        b=false;
        this.isErrordlina= true;
      }

      //высоту забора
      if (this.model.vysota == "") {
        b = false;
        this.isErrorvysota = true;
      } else {
        this.isErrorvysota = false;
      }

      //тип покрытия
      if (this.model.tip_pokrytiia == "") {
        b = false;
        this.isErrortip_pokrytiia = true;
      } else {
        this.isErrortip_pokrytiia = false;
      }

      //толщину листа
      // для сетки рябицы это не надо
      if (this.model.tolshchina == ""&&this.$store.state.type!=="setkarabica") {
        b = false;
        this.isErrortolshchina = true;
      } else {
        this.isErrortolshchina = false;
      }

      return b;
    },
    calc() {
      this.calcClick=true;
      this.$store.commit('setDisabled');
      if (this.validate()) {
         this.$store.commit('calc',this.model);
      }
      this.$store.commit('setDisabled');
    },

    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    showForm(event){
      let href=event.target.getAttribute("href");
      // акции
      let actions=this.addActions();
      // let act_str=JSON.stringify(actions);

      let data={
        model: this.model,
        actions:actions,
        type:this.$store.state.type,
        vysota_text:this.vysota_text,
        price:{
          price:this.$store.state.price,
          price_dlina:this.$store.state.price_dlina,
      
          price_vorot:this.$store.state.price_vorot,
          total_vorot:this.$store.state.total_vorot,
  
          price_kalitok:this.$store.state.price_kalitok ,
          total_kalitok:this.$store.state.total_kalitok,

          total_delivery:this.$store.state.total_delivery,
      
          total:this.$store.state.total,
          
          sales:this.$store.state.sales
        }
      };
      jQuery('[name="data"]',jQuery(href)).val(JSON.stringify(data));

      jQuery.magnificPopup.open({
        items: {
          src: event.target.getAttribute("href"),
          type: 'inline'
        }
      });

    },
    // открытие модалки
    showModal(event){
       let href=event.target.getAttribute("href");
       jQuery.magnificPopup.open({
        items: {
          src: href,
          type: 'inline'
        }
      });

    },
    //создание по ссылке
    createPDF(){

         this.pdfDisabled=true;
         this.pdfText="Идет создание документа ...";

    
        let actions=this.addActions();
        let act_str=JSON.stringify(actions);




        let formdata = new FormData();
        formdata.append("action", "pdfajax");
        
        formdata.append("type",this.$store.state.type);
        formdata.append("vysota_text",this.vysota_text);

        formdata.append("model",JSON.stringify(this.model));
        formdata.append("actions",act_str);
        
        formdata.append(" price",this.$store.state.price);
        formdata.append(" price_dlina",this.$store.state.price_dlina);
        formdata.append(" price_vorot",this.$store.state.price_vorot);
        formdata.append(" total_vorot",this.$store.state.total_vorot);

        formdata.append(" price_kalitok",this.$store.state.price_kalitok);
        formdata.append(" total_kalitok",this.$store.state.total_kalitok);

        formdata.append(" total_delivery",this.$store.state.total_delivery);
        formdata.append("total",this.$store.state.total);

        formdata.append("sales",this.$store.state.sales);

        let options = {
          method: "POST",
          data: formdata,
          url: process.env.VUE_APP_ENV_URL
         };
         Vue.axios(options).then(response => {
              this.pdfDisabled=false;
              this.pdfText="Распечатать расчет";
              
              this.link=response.data.link;
              let a = document.createElement("a");
              a.target="__blank";
              a.href = response.data.link;
              a.click();
         })
    },
    // вывод акция для печати
    addActions(){
      let actions=[];

      this.$store.state.actions.forEach((el,k) => {
          if(!el.disabled){
            actions.push({'photo':el.photo,'text':el.text})
          }
      });

      this.$store.state. action_alls.forEach((el,k) => {
          actions.push({'photo':el.photo,'text':el.text})
      });

      return actions;


    }
  },
  watch: {
    model: {
          handler(val){
            if(this.calcClick){
               this.calc();
            }
          },
          deep: true
    },
    'model.dlina'(val) {
      if (parseInt(val) < this.$store.state.min_length_zabor) {
        this.isErrordlina = true;
      } else {
        this.isErrordlina = false;
      }
      this.$store.commit('setActions',this.model)
    },
    'model.tip_pokrytiia'(val){
      this.$store.commit('setActions',this.model)
    }

  }
});
