<template>
    <section>
        <div class="box">
            <div class="form">
                <h2>Login</h2>
                <form action="">
                    <div class="inputBx">
                        <input type="text" v-model="loginData.Email" placeholder="Username">
                        <img src="@/assets/images/user-1.png">
                    </div>
                    <div class="inputBx">
                        <input type="password" v-model="loginData.Password" placeholder="Password">
                        <img src="@/assets/images/lock.png">
                    </div>
                    <div class="inputBx">
                        <input type="button" @click="sendLoginRequest" value="Login">
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
import { checkPerm } from '@/auth/utils'
export default {
  name: 'LoginView',
  data () {
    return {
      loginData: {
        Email: '',
        Password: ''
      }
    }
  },
  methods: {
    sendLoginRequest () {
      useJwt.login(this.loginData).then((res) => {
        useJwt.setToken(res.data.data.token)
        useJwt.setUserData(JSON.stringify(res.data))

        this.$store.commit('auth/set_token', res.data.data.token)
        this.$store.commit('auth/set_username', res.data.data.username)
        this.$store.commit('auth/set_userId', res.data.data.userId)
        this.$store.commit('auth/set_userType', res.data.data.userType)

        if (checkPerm('home_page')) {
          setTimeout(() => {
            this.$router.push({ name: 'home' }).catch((err) => {
              console.log(err)
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

    section {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(-30deg, #03a9f4 0%, #3a78b7 50%, #262626 50%, #607b8b 100%);
        filter: hue-rotate(120deg);
        animation: animate 20s linear infinite;

        @keyframes animate {
            0% {
                filter: hue-rotate(0deg);
            }
            100% {
                filter: hue-rotate(360deg);
            }
        }

        .box {
            position: relative;
            padding: 50px;
            width: 360px;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            box-shadow: 0 5px 35px rgba(0, 0, 0, 0.2);

            .form {
                position: relative;
                width: 100%;

                h2 {
                    color: #fff;
                    font-weight: 600;
                    letter-spacing: 2px;
                    margin-bottom: 30px;
                }

                .inputBx {
                    position: relative;
                    width: 100%;
                    margin-bottom: 20px;

                    input {
                        width: 100%;
                        max-width: 85%;
                        outline: none;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        background: transparent;
                        padding: 8px 10px 8px 35px;
                        border-radius: 6px;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 300;
                        box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
                    }

                    input::placeholder {
                        color: #fff;
                    }

                    img {
                        position: absolute;
                        top: 8px;
                        left: 26px;
                        transform: scale(0.7);
                        filter: invert(1);
                    }

                    input[type="submit"] {
                        background: #fff;
                        color: #111;
                        max-width: 100px;
                        padding: 8px 10px;
                        box-shadow: none;
                        font-weight: 500;
                        letter-spacing: 1px;
                        cursor: pointer;

                    }
                }

                .remember {
                    position: relative;
                    display: inline-block;
                    color: #fff;
                    font-weight: 300;
                    margin-bottom: 10px;
                    cursor: pointer;

                    input{
                      margin-right: 5px;
                    }

                }

                p {
                    color: #fff;
                    font-weight: 300;
                    font-size: 15px;
                    margin-top: 5px;

                    a {
                        color: #fff;
                    }
                }
            }
        }

        .box::after {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border-radius: 5px;
            pointer-events: none;
            background: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 15%, transparent 50%, transparent 85%,rgba(255,255,255,0.3) 100%);
        }

    }
}
</style>
