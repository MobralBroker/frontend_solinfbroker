<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <div class="container">
                            <img src="../../assets/img/logo.png" alt="Logotipo" width="120" class="logo-img">
                        </div>
                  <h1>Solinfbroker</h1>
                  <p class="text-body-secondary">Acesse sua conta </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>

                    <CFormInput
                    type="email"
                                id="emai"
                                name="email"
                                placeholder="digite seu email"
                                :rules="validateEmail"
                                v-model="email"
                    />

                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>

                    <CFormInput
                    type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            :rules="validate"
                            v-model="senha"
                    />

                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4"  @click="loinUser"> Login </CButton>
                    </CCol>
                    
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Registre-se</h2>
                  <p>
                    Abra já sua conta!
                  </p>
                  <CButton color="light"   @click="toRegistro()"  variant="outline" class="mt-3">
                    Cadastre-se
                  </CButton>

                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
    import swal from 'sweetalert'
    import sevice from '../../service/controller'
    import{Form,Field,ErrorMessage} from 'vee-validate'

    export default{
        
        components:{Field,Form,ErrorMessage},
        name:'Login',
        data(){
            return{
                
                email:null,
                senha:null
            
            }
        },
        methods:{
            async loinUser(e){
                e.preventDefault();
                
                const data ={
                    email:this.email,
                    senha:this.senha
                }
                try{
                    const token = await sevice.login(data)
                    localStorage.setItem('token', token.token);
                    
                    swal({
                        title: 'Sucesso!',
                        text: 'Usuário(a) logado com sucesso!',
                        icon: 'success',
                    }).then(()=>{
                        localStorage.setItem('userMail', this.email)
                        this.$router.push('/home')
                    })
                }
                catch(err){
                    swal({
                        title: 'Oops!',
                        text: 'Senha ou Email incorretos',
                        icon: 'error',
                    })
                }
            },
            toRegistro() {
              this.$router.push('/register');
            },
            validateEmail(value) {
      
                if (!value) {
                    return 'Campo obrigatorio';
                }
                
                // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                // if (!regex.test(value)) {
                //     return 'Este tipo de Email é invalido!';
                // }
                
                return true;
            },
            validate(value){
                
                
                if(!value ){
                    return 'campo obrigatorio'
                }
                if(value.includes(' ')){
                    return "Senha não pode obter espaços"
                }
                
                if(value.length>=1 && value.length<=12){
                   return true 
                }

                return 'A senha deve obter entre 6 e 8 caracters!'
            }
        }
}
</script>

<style>

.login-page {
  height: 90vh;
  display: flex;
  align-items: center;
  background-image: url('../../assets/img/white.png');
  background-size: cover;
  background-position: center;
}
.btn-custom {
    background-color: #14a401;
    border: 2px solid #ffffff;
}
</style>