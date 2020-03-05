<template>
    <div>
        <div class="container">
            <!-- vue start *****************************************-->
            <div id="start_calc" class="row">
                <div class="s-calc__col col-lg-8 col-xl-9 col-md-7">
                    <div class="form-wrap p-0">

                        <div class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                  <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">
                                     <a v-cloak v-tooltip="{
                                                     content:  'Минимальная длина '+$store.state.min_length_zabor+' м',
                                                     autoHide: false,
                                                      show: true
                                                   }
                                              "
                                        v-if="isErrordlina" class="btn-qu" href="#">?</a>
                                      Введите длину забора
                                 </span>
                                </div>
                                <div class="col">
                                    <input v-model="model.dlina" :class="{ error: isErrordlina }"
                                           :min="$store.state.min_length_zabor" class="form-wrap__input form-control"
                                           type="number" :placeholder="$store.state.min_length_zabor+' м'"/>
                                </div>
                            </div>
                        </div>

                        <div v-cloak class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                    <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">Выберите высоту забора</span>
                                </div>
                                <div class="col">
                                    <select :class="{ error: isErrorvysota }" v-model="model.vysota"
                                            class="form-wrap__input form-control">
                                        <option value=""> Выбрать</option>
                                        <option v-for="(item, index) in $store.state.vysota" :value="item" :key="index">
                                            {{item}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div v-cloak class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                  <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">
                                       {{$store.state.name['text2']}}
                                      <a v-if="$store.state.photo_modals.length>0" @click.prevent="showModal"
                                         class="btn-qu popup-with-move-anim" href="#modal-info">?</a>
                                     </span>
                                </div>
                                <div class="col">
                                    <select :class="{ error: isErrortip_pokrytiia }" v-model="model.tip_pokrytiia"
                                            class="form-wrap__input form-control">
                                        <option value=""> Выбрать</option>
                                        <option v-for="(item, index) in $store.state.tip_pokrytiia" :value="item"
                                                :key="index">{{item}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div v-cloak class="form-wrap__input-wrap form-group" v-if="$store.state.tolshchina.length>0">
                            <div class="row align-items-center">
                                <div class="col-lg-4">

                      <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">
                            {{$store.state.name['text1']}}
                            <a v-cloak v-tooltip="{
                                                    content:  ' Новолипецкий комбинат не производит профнастил <br> '+model.tip_pokrytiia+' и толщиной '+model.tolshchina+' мм,<br> выберите другие параметры ',
                                                    autoHide: false,
                                                    show: true
                                                   }
                                                "
                               v-if="$store.state.errorGlobal.error1"
                               class="btn-qu" href="#">
                              ?
                            </a>

                      </span>
                                </div>
                                <div class="col">
                                    <select :class="{ error: isErrortolshchina }" v-model="model.tolshchina"
                                            class="form-wrap__input form-control">
                                        <option value="">Выбрать</option>
                                        <option v-for="(item,index) in $store.state.tolshchina" :value="item"
                                                :key="index">{{item}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div v-cloak class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                    <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">Выберите количество ворот</span>
                                </div>
                                <div class="col">
                                    <select :class="{ error: vorotRelationsCount }" v-model="model.kol_vorot"
                                            class="form-wrap__input form-control">
                                        <option value="">Выбрать</option>
                                        <option v-for="n in 6" :key="n" :value="n">{{n}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                     <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">
                                         Выберите ширину ворот, м
                                      </span>

                                </div>
                                <div class="col">
                                    <select :class="{ error : vorotRelationsShirina }" v-model="model.shirina_vorot"
                                            class="form-wrap__input form-control">
                                        <option value="">Выбрать</option>
                                        <option v-for="(item,index) in $store.state.shirina_vorot" :value="item"
                                                :key="index">{{item}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-wrap__input-wrap form-group">
                            <div class="row align-items-center">
                                <div class="col-lg-4">
                                    <span class="form-wrap__title justify-content-lg-end align-items-center small d-flex flex-wrap mb-1">Выберите количество калиток</span>
                                </div>
                                <div class="col">
                                    <select v-model="model.kol_kalitok" class="form-wrap__input form-control">
                                        <option value="">Выбрать</option>
                                        <option v-for="item in 5" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-xl-9 col-md-7 order-md-last">
                    <div class="row justify-content-center">
                        <div class="offset-md-0 col-md-12 offset-lg-4 col-lg-6 mb-4">
                            <button :disabled="$store.state.disabled" @click="calc"
                                    class="s-calc__btn btn btn-accent btn-block">Рассчитать
                            </button>
                        </div>
                    </div>
                </div>
                <div class="s-calc__col col-lg-4 col-xl-3 col-md-5">
                    <div class="s-calc__item justify-content-between">
                        <div class="s-calc__img-wrap text-center d-none d-md-block">
                            <img :src="$store.state.img" class="res-i"/>
                        </div>
                        <div class="offset-lg-2 offset-md-2 s-calc__text-block" v-cloak
                             v-show="$store.state.showResult">
                            <div class="s-calc__group" v-if="$store.state.type!=='setkarabica'">
                                <div class="text-gr">Стоимость забора</div>
                                <div class="h3">{{$store.state.total_not_sales | numFormat}} руб.</div>
                            </div>

                            <div class="s-calc__group" v-if="$store.state.type!=='setkarabica'">
                                <div class="text-gr">Скидка за объем</div>
                                <div class="h3">{{$store.state.sales | numFormat}} руб.</div>
                            </div>
                            <div class="s-calc__group">
                                <div class="text-gr">Итоговая стоимость</div>
                                <div class="h3 text-primary strong">{{$store.state.total | numFormat}} руб.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <table v-cloak v-show="$store.state.showResult&&!$store.state.table_price_hidden" class="calc-table table">
                <thead>
                <tr>
                    <td>Работы и материалы</td>
                    <td>Ед.изм.</td>
                    <td>Кол-во</td>
                    <td>Цена, руб.</td>
                    <td>Сумма, руб</td>
                </tr>
                </thead>
                <tbody>
                <!-- профнастил end -->
                <tr v-if="$store.state.type=='prof'">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">
                            Забор из профнастила <strong>{{model.tip_pokrytiia}}</strong>; выс. Н-{{model.vysota}}; 2
                            лаги;
                        </div>
                        <ul>
                            <li>отечественный профнастил С8; производство Новолипецкий МК
                            </li>
                            <li>столбы L-{{vysota_text}}м 60x60x2 мм</li>
                            <li>лаги 40х20 мм</li>
                            <li> столбы окрашены грунтовкой ГФ 21, обеспечивающей хорошую адгезию и антикоррозионную
                                защиту (цвет грунтовки либо серый, либо кирпично-красный)
                            </li>
                            <li> пластиковые заглушки на столбах</li>
                            <li> саморезы в цвет профлиста</li>
                            <li> общее заглубление столбов на глубину 1,2 метра с шагом 2,5 метра</li>
                        </ul>
                    </td>
                    <td data-title="Ед.изм.">пог.м</td>
                    <td data-title="Кол-во">{{model.dlina}}</td>
                    <td data-title="Цена, руб.">{{$store.state.price | numFormat}}</td>
                    <td data-title="Сумма, руб">{{$store.state.price_dlina | numFormat}}</td>
                </tr>
                <!-- профнастил end -->
                <!--  евроштахетник-->
                <tr v-if="$store.state.type=='evroshtaketnik'">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">
                            Забор из металлического штакетника <strong>{{model.tip_pokrytiia}}</strong>; выс.
                            Н-{{model.vysota}}; 2 лаги; зазор {{model.tolshchina}} см;
                        </div>
                        <ul>
                            <li>
                                Металлический штакетник NOVA Lux толщиной 0,5 мм с закруглёнными и завальцоваными краями
                            </li>
                            <li>столбы L-{{vysota_text}}м 60x60x2 мм</li>
                            <li>лаги 40х20 мм</li>
                            <li> столбы окрашены грунтовкой ГФ 21, обеспечивающей хорошую адгезию и антикоррозионную
                                защиту (цвет грунтовки либо серый, либо кирпично-красный)
                            </li>
                            <li> пластиковые заглушки на столбах</li>
                            <li> саморезы в цвет профлиста</li>
                            <li> общее заглубление столбов на глубину 1,2 метра с шагом 2,5 метра</li>
                        </ul>
                    </td>
                    <td data-title="Ед.изм.">пог.м</td>
                    <td data-title="Кол-во">{{model.dlina}}</td>
                    <td data-title="Цена, руб.">{{$store.state.price | numFormat}}</td>
                    <td data-title="Сумма, руб">{{$store.state.price_dlina | numFormat}}</td>
                </tr>
                <!--  евроштахетник end-->
                <!--  сетка рябица-->
                <tr v-if="$store.state.type=='setkarabica'">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">
                            Забор из сетки-рабицы с <strong>{{model.tip_pokrytiia}}</strong>; выс. Н-{{model.vysota}}; 2
                            лаги;
                        </div>
                        <ul>
                            <li>
                                оцинкованная сетка-рабица с ячейками 50х50 мм и толщиной 1,8 мм
                            </li>
                            <li>столбы L-{{vysota_text}}м 60x40x2 мм</li>
                            <li>столбы окрашены грунтовкой ГФ 21, обеспечивающей хорошую адгезию и антикоррозионную
                                защиту
                            </li>
                            <li> пластиковые заглушки на столбах</li>
                            <li> общее заглубление столбов на глубину 0,9м с шагом 2,5 метра</li>
                        </ul>
                    </td>
                    <td data-title="Ед.изм.">пог.м</td>
                    <td data-title="Кол-во">{{model.dlina}}</td>
                    <td data-title="Цена, руб.">{{$store.state.price | numFormat}}</td>
                    <td data-title="Сумма, руб">{{$store.state.price_dlina | numFormat}}</td>
                </tr>
                <!--  евроштахетник end-->

                <tr v-show="$store.state.total_vorot>0">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">Каркас ворот {{model.shirina_vorot}}x{{model.vysota}} м</div>
                        <ul>
                            <li>каркас из профтрубы 40х20х2</li>
                            <li>усиленные столбы 80х80 толщиной 3 мм</li>
                            <li>изнутри запирающее устройство "Гусь" с проушинами для замка</li>
                            <li>2 нижних стопора</li>
                            <li>петли на подшипниках (обеспечивают бесшумное открывание и легкость вращения)</li>
                        </ul>
                    </td>

                    <td data-title="Ед.изм.">ед.</td>
                    <td data-title="Кол-во">{{model.kol_vorot}}</td>
                    <td data-title="Цена, руб.">{{$store.state.price_vorot | numFormat}}</td>
                    <td data-title="Сумма, руб">{{$store.state.total_vorot | numFormat}}</td>
                </tr>

                <tr v-show="$store.state.total_kalitok>0">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">Каркас калитки 1х{{model.vysota}}м</div>
                        <ul>
                            <li>каркас из профтрубы 40х20х2</li>
                            <li>усиленные столбы 80х80 толщиной 3 мм</li>
                            <li>петли на подшипниках (обеспечивают бесшумное открывание и легкость вращения)</li>
                            <li>снаружи проушины для замка</li>
                            <li>изнутри запирающая щеколда</li>
                        </ul>
                    </td>
                    <td data-title="Ед.изм.">ед.</td>
                    <td data-title="Кол-во">{{model.kol_kalitok}}</td>
                    <td data-title="Цена, руб.">{{$store.state.price_kalitok | numFormat}}</td>
                    <td data-title="Сумма, руб">{{$store.state.total_kalitok | numFormat}}</td>
                </tr>

                <tr v-show="$store.state.total_delivery>0">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">Доставка (с учетом выезда и погрузочно-разгрузочных работ)</div>
                    </td>
                    <td colspan="4" data-title="Сумма, руб">{{$store.state.total_delivery | numFormat}}</td>
                </tr>

                <tr v-show="$store.state.sales>0&&$store.state.type!=='setkarabica'">
                    <td data-title="Работы и материалы">
                        <div class="strong pb-3">Скидка за объем</div>
                    </td>
                    <td colspan="4" data-title="Сумма, руб">- {{$store.state.sales | numFormat}}</td>
                </tr>

                <tr>
                    <td colspan="5">
                        <div class="fw-900 h2">
                            итого:
                            <span class="text-primary">{{$store.state.total | numFormat}} руб</span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="s-content s-content--calc section pt-0" v-cloak v-show="$store.state.showResult">
            <div class="container">
                <div class="s-content__items">
                    <div class="row ">

                        <template>
                            <div v-for="(item,index) in $store.state.actions"
                                 :key="index+1000"
                                 v-show="!item.disabled"
                                 class="s-content__col col-lg-4 col-sm-6">
                                <div class="s-content__item">
                                    <div class="row">
                                        <div class="col-auto">
                                            <div class="s-content__icon-wrap">
                                                <img :src="item.photo" alt="">
                                            </div>
                                        </div>
                                        <div class="col">{{item.text}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template>
                            <div v-for="(item,index) in $store.state.action_alls" :key="index"
                                 class="s-content__col col-lg-4 col-sm-6">
                                <div class="s-content__item">
                                    <div class="row">
                                        <div class="col-auto">
                                            <div class="s-content__icon-wrap">
                                                <img :src="item.photo" alt="">
                                            </div>
                                        </div>
                                        <div class="col">{{item.text}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="col-lg-12">* П-образная планка и кованая лавочка не суммируются</div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-6 col-lg-6 col-sm-10 col-xs-12">
                        <a class="btn btn-primary btn-block btn-lg" @click.prevent="showForm" href="#modal-calc-phone">Получить
                            точный расчет по телефону</a>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="$store.state.photo_modals.length>0"
             class="zoom-anim-dialog mfp-hide modal-win modal-form modal-win--lg" id="modal-info">
            <div class="row">
                <div class="col-xl-3 col-lg-4">
                    <div class="btn-qu">?</div>
                    <div class="h4 strong">Типы покрытия</div>
                </div>
                <div class="col">
                    <table class="table">
                        <thead>
                        <tr>
                            <td></td>
                            <td>Лицевая сторона</td>
                            <td>Внутренняя сторона</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in $store.state.photo_modals">
                            <td>{{item.title}}</td>
                            <td data-title="Лицевая сторона">
                                <img :src="item.photo[0].photo" class="res-i" alt=""/>
                            </td>
                            <td data-title="Внутренняя сторона">
                                <img :src="item.photo[1].photo" class="res-i" alt=""/>
                            </td>
                        </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CalcOne",
        data(){
            return {
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

            }
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
    }
</script>

<style scoped>

</style>