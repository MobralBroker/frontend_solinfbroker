<template>

  <div>
    <CRow class="mb-2" style="  display: flex;"> <!-- flex-direction: column; height: 400px; overflow: hidden;">-->
      <CCol :md="12">
        <CCard :mb="12" >
          <CCardHeader>Cliente</CCardHeader>
            <CCol :xs="12" class="mb-4" style="padding: 10px;">
              <CCard> 
                <CCardBody style="padding: 10px;">
                  <CRow >
                    <CCol :xs="12">
                  
                      <div style="  display: flex; align-items: center;">
                        <H5> Bem-Vindo, {{ userProfile.nomeUsuario }} !</H5>
                      </div>
                      <br>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
             </CCol>
        </CCard>
      </CCol>
    </CRow>


    <CRow class="mb-2" style="  display: flex;"> <!-- flex-direction: column; height: 400px; overflow: hidden;">-->
      <CCol :md="4">
      <CCard :mb="4" >
          <CCardHeader>Compra & Venda de Ativos</CCardHeader>
          <CCol :xs="12" class="mb-4" style="padding: 10px;">
            <CCard> 
                <CCardBody style="padding: 10px;">
                  <CRow >
                    <CCol :xs="12">

                      <!-- Compra/Venda -->
                      <CListGroup>
                        <CListGroupItem active class="mb-2">Ordem</CListGroupItem>
                        <!--<CFormInput placeholder="Ativo" autocomplete="Ativo" v-model="selectedAtivo.sigla"> </CFormInput>-->
                        <CFormInput placeholder="Ativo" autocomplete="Ativo" v-model="selectedAtivo.sigla" class="mb-2" disabled/>
                        <!--<CFormInput placeholder="Valor" autocomplete="Valor" v-model="selectedAtivo.valor"/>-->
                        <CFormInput
                                  id="currencyInput"
                                  v-model="valorAtivo"
                                  @input="updateValueSaque"
                                  placeholder="Valor"
                                  class="mb-2" 
                                    />
                        <!-- <input class="mb-2" placeholder = "Valor" type="text" id="text" v-model="selectedAtivo.valor" v-maska:[maska_options] data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional"> -->
                        <!--<CFormInput placeholder="Quantidade" autocomplete="username" v-model="orderSellandBuy.quantidadeOrdem" />-->
                        <CFormInput class="mb-2" placeholder="Quantidade" autocomplete="username" v-model="orderSellandBuy.quantidadeOrdem" />
                        <!-- <CFormSwitch v-model="switchValue" :switch="{ color: 'success' }" size="xl" label="Vender" id="formSwitchCheckDefaultXL"/> -->

                        <CButtonGroup class="mb-2" role="group">
                          <CFormCheck
                            type="radio"
                            :button="{ color: 'info', variant: 'outline' }"
                            name="btnradio1"
                            id="btnradio1"
                            autocomplete="false"
                            label="COMPRA"
                            :checked="selectedOption === true"
                            @change="handleRadioChange(true)"
                          />
                          <CFormCheck
                            type="radio"
                            :button="{ color: 'danger', variant: 'outline' }"
                            name="btnradio2"
                            id="btnradio2"
                            autocomplete="false"
                            label="VENDA"
                            :checked="selectedOption === false"
                            @change="handleRadioChange(false)"
                          />
                        </CButtonGroup>
                        <br>
                      </CListGroup>

                      <CButton color="success" shape="rounded-pill" class="px-8" @click="check_possibleBuy()" style="color: white; width: 100%;">Enviar Ordem</CButton>

                    </CCol>

                  </CRow>
                </CCardBody>
            </CCard>
          </CCol>
        </CCard>
      </CCol>
      
      <CCol :md="8">
        <CCard :mb="4">
          <CCardHeader> Ativo: {{selectedAtivo.sigla}}</CCardHeader>
          <CCardBody style="padding: 10px;">
          <CCard> 
          <CCardBody style="padding: 10px;">
            <CRow>
              <CCol :md="6">
            <CFormSelect v-model="periodo" size="sm" class="mb-3" aria-label="Small select example" v-on:click="(atualizarGrafico())">
              <option value="7" active>Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="360">Último ano</option>
            </CFormSelect>
              </CCol>
              <CCol :md="6">
            <CFormSelect v-model="escala" size="sm" class="mb-3" aria-label="Small select example" v-on:click="(atualizarGrafico())">
              <option value="minute">Minuto</option>
              <option value="hour">Hora</option>
              <option value="day">Dia</option>
            </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <div id="chart">
            <apexchart type="candlestick" height="250" :options="chartOptions" :series="series"></apexchart>
          </div>
            </CRow>

          </CCardBody>
          </CCard>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    

    <CRow>
    <CCol :md="12">
      <CCard class="mb-4" style="padding-bottom: 10px;">
          <CCardHeader>Destaques de Mercado</CCardHeader>

            <CTable align="middle" class="mb-0 border " responsive hover >
              <CTableHead class="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell class="bg-body-secondary text-center" > Ativo </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Atualização </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Max. </CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Min.</CTableHeaderCell>
                  <CTableHeaderCell class="bg-body-secondary text-center"> Valor </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in vetorAtivos" :key="item.id" v-on:click="(handleItemAtivo(item))" >
                <CTableDataCell class="text-center"> <div>{{ item.sigla }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div> {{ item.atualizacao }} </div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ formatarValores(item.valorMax) }}</div> </CTableDataCell>
                <CTableDataCell class="text-center"> <div class="fw-semibold">{{ formatarValores(item.valorMin) }}</div> </CTableDataCell> 
                <CTableDataCell> <div class="fw-semibold text-nowrap text-center ">{{ formatarValores(item.valor) }} </div> </CTableDataCell>
              </CTableRow>
            </CTableBody>
            </CTable>

        </CCard>

    </CCol>
   </CRow>
  
  
  </div>
</template>

<script>
import service from '../../service/controller';
import swal from 'sweetalert';
import VueApexCharts from "vue3-apexcharts";
import { CCol, CRow } from "@coreui/vue";


//Valores para v-mask

export default {
  name: 'Dashboard',
  components: {
    apexchart: VueApexCharts,

  },
  data() {
    
    return {
      series: [{
            data: [{
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
              },
              {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11]
              },
              {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65]
              },
              {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24]
              },
              {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47]
              },
              {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31]
              },
              {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02]
              },
              {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02]
              },
              {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01]
              },
              {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02]
              },
              {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91]
              },
              {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612]
              },
              {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612]
              },
              {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95]
              },
              {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67]
              },
              {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4]
              },
              {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9]
              },
              {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45]
              },
              {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35]
              },
              {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53]
              },
              {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19]
              },
              {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620]
              },
              {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620]
              },
              {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61]
              },
              {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58]
              },
              {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86]
              },
              {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16]
              },
              {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4]
              },
              {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81]
              },
              {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578]
              },
              {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579]
              },
              {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96]
              },
              {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92]
              },
              {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22]
              },
              {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08]
              },
              {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25]
              },
              {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97]
              },
              {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602]
              },
              {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95]
              },
              {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02]
              },
              {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591]
              },
              {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592]
              },
              {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34]
              },
              {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86]
              },
              {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01]
              },
              {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25]
              },
              {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99]
              },
              {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81]
              },
              {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96]
              },
              {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39]
              },
              {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27]
              },
              {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55]
              },
              {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02]
              },
              {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01]
              },
              {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06]
              },
              {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89]
              },
              {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5]
              },
              {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86]
              },
              {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07]
              },
              {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606]
              },
            ]
          }],
          chartOptions: {
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left'
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          },


          connection: null ,
          orderSellandBuy: {
                    idCliente:'',
                    idAtivo: '', 
                    tipoOrdem: '',
                    valorOrdem: '',
                    quantidadeOrdem: null
          },
          selectedAtivo: {
              id: null,
              sigla: '',
              nome: null,
              atualizacao: null,
              quantidadesPapeis: null,
              valorMax: null,
              valorMin:null,
              valor: null
          },

          vetorAtivos: [],
          
          userProfile: {
          },
          selectedOption: true,
          valorAtivo:"R$ 0,00",
          valorAtivoValue: 0,
          escala:"day",
          periodo:"7",
          idAtivo:0,
    }
  },
  methods:{
  
    handleRadioChange(isCompra) {
      if (isCompra) {
        this.selectedOption = true;
      } else {
        this.selectedOption = false;
      }
    },

    async handleItemAtivo(item){
      this.selectedAtivo.id = item.id
      this.selectedAtivo.sigla = item.sigla
      this.selectedAtivo.nome = item.nome
      this.selectedAtivo.atualizacao = item.atualizacao
      this.selectedAtivo.quantidadesPapeis = item.quantidadesPapeis
      this.selectedAtivo.valorMax = item.valorMax
      this.selectedAtivo.valorMin = item.valorMin
      this.selectedAtivo.valor = item.valor


        // Formatando o valor como moeda brasileira
        this.valorAtivo= new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(item.valor);


      // console.log("escala",this.escala)
      // console.log("periodo",this.periodo)

      const responseData = await service.buscarHistorico(item.id, this.escala,this.periodo);      
      if (responseData && responseData.data && Array.isArray(responseData.data) && responseData.data.length > 0) {
          this.series = [{
            data: responseData.data.map(item => ({
              x: new Date(item.x),
              y: [item.y[0], item.y[1], item.y[2], item.y[3]] // open,high,low,close
            }))
          }];

      }else{
        console.log(this.selectedAtivo.valor, this.selectedAtivo.valorMax, this.selectedAtivo.valorMin, this.selectedAtivo.valor);
        this.series = [{
            data: 
            [
              {
                x: new Date(1538778600000),
                y: [this.selectedAtivo.valor, this.selectedAtivo.valorMax, this.selectedAtivo.valorMin, this.selectedAtivo.valor]
              }
            ]
          }];
      }

    },
    async Order(value){

                  if(this.selectedOption == false){
                    this.orderSellandBuy.tipoOrdem = "ORDEM_VENDA"
                  }else{
                    this.orderSellandBuy.tipoOrdem = "ORDEM_COMPRA"
                  }                  
                   this.orderSellandBuy.quantidadeOrdem = parseInt( this.orderSellandBuy.quantidadeOrdem , 10)
                   this.orderSellandBuy.idCliente = this.userProfile.id
                   this.orderSellandBuy.idAtivo = this.selectedAtivo.id
                   this.orderSellandBuy.valorOrdem = value
                  console.log(this.orderSellandBuy);
                try {
                    await service.sentOrder(this.orderSellandBuy);
                    swal('Sucesso', 'Ordem submetidas com sucesso!', 'success');
                    } catch (error) {
                        console.error('Erro ao comprar ações:', error);
                        swal('Erro', 'Ocorreu um erro ao processar sua ordem T.T', 'error');
                    }

    },
    
    async Ativos(){
          try{
              const response = await service.getAtivos();
              if (Array.isArray(response)) {

                this.vetorAtivos = response.map(item => {   
                  return {
                    id: item.id,
                    sigla: item.sigla,
                    nome: item.nome,
                    atualizacao: item.atualizacao,
                    quantidadesPapeis: item.quantidadesPapeis,
                    valorMax: item.valorMax,
                    valorMin: item.valorMin,
                    valor: item.valor
                  };
                });
                console.log(this.vetorAtivos)
              }            
            } catch(error){
              console.log(error)
            }
    },

    async getProfile(){
      const response = await service.getUserProfile();
      console.log(response)
      try{
        this.userProfile = {   
            id: response.id,
            nomeUsuario: response.nomeUsuario,
            saldo: response.saldo,
            email: response.email
        }
        localStorage.setItem('idCliente', this.userProfile.id);
      } catch(error){
        console.log(error)
      }
    },

    check_possibleBuy(){
      console.log("selectedOption ::: ", this.selectedOption)

      var valorOrdemFormat = this.valorAtivo

      valorOrdemFormat = valorOrdemFormat.replace("R", "");
      valorOrdemFormat = valorOrdemFormat.replace("$", "");
      valorOrdemFormat = valorOrdemFormat.replace(" ", "");
      valorOrdemFormat = valorOrdemFormat.trim();
      do {
        valorOrdemFormat = valorOrdemFormat.replace(".", "");
      } while (valorOrdemFormat.includes("."));

      valorOrdemFormat = valorOrdemFormat.replace(",", ".");
      console.log(this.valorAtivoValue)
      if(this.selectedOption === false ){
        this.Order(valorOrdemFormat)
        return 'Ordem de venda, ignorar'
      }else if(this.selectedOption == true){
        if(valorOrdemFormat > this.userProfile.saldo){
          swal('Aviso', 'A compra que você está tentando fazer excede o seu saldo.', 'warning')
          return 'Saldo baixo, impossível fazer compra'
        }else if(valorOrdemFormat <= this.userProfile.saldo){
          this.Order(valorOrdemFormat)
          return 'Sucesso, saldo alto o bastante'
      }
      }
    },
    updateValueSaque(event) {

      // Remover caracteres não numéricos, exceto ponto e vírgula
      const numericValue = parseFloat(event.target.value.replace(/[^\d]/g, ""));
      
      console.log(event.target.value)
      console.log(numericValue)
      console.log(this.valorAtivoValue)

      // Atualizar o valor bruto
      this.valorAtivoValue = isNaN(numericValue) ? 0 : numericValue;

      // Formatando o valor como moeda brasileira
      this.valorAtivo = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(this.valorAtivoValue /100);
      console.log(this.valorAtivo)
    },
    formatarValores(item) {

    // Formatando o valor como moeda brasileira
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(item );
    },

  sendMessage(message) {
    console.log(this.connection);
    this.connection.send(message);

  },
  async wsSocket(){
    const token = localStorage.getItem('token')
      document.cookie = 'X-Authorization=' + token + '; path=/';
        this.connection = new WebSocket("ws://localhost:8086/dash")
    
      this.connection.onopen = (event) => {
        console.log(event)
        console.log("WS conectado")
      }

      this.connection.onmessage = (event) => {

        var jsonObj = JSON.parse(event.data); 


        if(jsonObj.tipo == "ativo"){
          console.log("jsonObj")
        console.log(jsonObj)
        console.log("vetorAtivos")
        console.log(this.vetorAtivos)

          const index = this.vetorAtivos.findIndex(ativo => ativo.id === jsonObj.dados.id);
          console.log(index)
          if (index != -1) {
            console.log("entrou")


            const data = new Date(timestamp);
            const ano = data.getFullYear();
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const dia = String(data.getDate()).padStart(2, '0');
            const dataLancamento = `${dia}/${mes}/${ano}`;


          const updateAtivo = {
            id: jsonObj.dados.id,
            id_empresa: this.vetorAtivos[index].id_empresa,
            atualizacao: dataLancamento,
            sigla: this.vetorAtivos[index].sigla,
            valor: jsonObj.dados.valor,
            nome: this.vetorAtivos[index].nome,
            quantidadesPapeis: this.vetorAtivos[index].quantidadesPapeis,
            valorMax: this.vetorAtivos[index].valorMax,
            valorMin: this.vetorAtivos[index].valorMin
          };

        this.vetorAtivos.splice(index,1)
        this.vetorAtivos.unshift(updateAtivo)
        // this.vetorAtivos[index] = updateAtivo
        }
      }else if (jsonObj.tipo == "historico"){
        console.log("historico")
        console.log(jsonObj.dados)

      }

      }
      this.connection.onerror = (event) =>  {
    console.error("Erro no WebSocket:", event);
  };
  

// Evento disparado quando a conexão é fechada
this.connection.onclose = (event) =>  {
    console.log("Conexão WS fechada:", event);
};

  },
  getDateTime(timestamp){

const currentDate = new Date();
const data = new Date(timestamp);

const ano = data.getFullYear();
const mes = String(data.getMonth() + 1).padStart(2, '0');
const dia = String(data.getDate()).padStart(2, '0');
const hora = String(data.getHours()).padStart(2, '0');
const minuto = String(data.getMinutes()).padStart(2, '0');
const segundo = String(data.getSeconds()).padStart(2, '0');
const milissegundo = String(data.getMilliseconds()).padStart(3, '0');
const dataLancamento = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.${milissegundo}`;

return dataLancamento
}

  },
  mounted() {
    this.Ativos();
    this.getProfile();
    this.wsSocket();
  },
}
</script>
