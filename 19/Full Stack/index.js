const app = document.getElementById("app")

//array, vetor, lista
const users = [
  {
    email: 'teste@test.com',
    phone: '999999999999',
    ref: 100,
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '99999999999',
    ref: 200,
    refBy: 100
  },
  {
    email: 'tost@tost.com',
    phone: '99999999999',
    ref: 300,
    refBy: 100
  }
]
const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

const getTotalSubscribers = (userData) => {
  const subs = users.filter ((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `    
    <main>
      <h3>Inscrição confirmada </h3>

      <p>
        Convide mais pessoas e concorra a prêmios! <br>
      Compartilhe o link e acompanhe as incrições:
      </p>

      <div class="input-group">
        <label for="link">
          <img src="link.svg" alt="link icon">
        </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
      </div>
    </main>
    <section class="stats">
      <h4>
        ${getTotalSubscribers(userData)}
      </h4>
      <p>
        Incrições feitas
      </p>
    </section>
`
app.setAttribute('class', 'page-invite')
updateImageLinks()
}
const saveUser = (userData) => {
  const newUser = { 
    ...userData,
    ref: Math.round(Math.random()* 4000),
    refBy:100
  }
  users.push(newUser)
  console.log (users)
  return newUser
}
const formAction = () => {
  const form = document.getElementById('form')
  form.onsubmit = (event) => {
    //event.preventDefault()
    console.log('teste')
    const formData = new FormData (form)
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone'),
    }
    const user = getUser (userData)
    if (user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
  }
} 

const updateImageLinks = () => {
  document.querySelectorAll('img').forEach((img)=>{
    if (img.src.includes('githubusercontent')){
      return
    }
    const src = img.getAttribute('src')
    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
})
}
const startApp = () => {
  const content =`
  <main>
      <section class="about">
        <div class="section-header" >
        <h2>
          Sobre o evento
        </h2>
        <span class="badge"> AO VIVO</span>
        </div>
        <p>
          Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
          <br/><br/>
          Dias 15 a 17 de março | Das 18h ás 21h | Online & Gratuito
        </p>
      </section>
      <section class="registration">
        <h2>Incrição</h2>

        <form id="form">
            <div class="input-wrapper">
              <div class="input-group">
                <label for="email">
                  <img src="mail.svg" alt="Email icon">
                </label>
                <input type="email" id="email" name="email"
                placeholder="E-mail">
              </div>
              
              <div class="input-group">
                <label for="phone">
                  <img src="phone.svg" alt="Phone icon">
                </label>
                <input type="text" id="phone" name="phone"
               placeholder="Telefone">
              </div>
            </div>

          <button>
            Confirmar
            <img src="arrow.svg" alt="Arrow right">
          </button>
        </form>
      </section>
    </main>
  `
  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImageLinks()
  formAction()
}
startApp()
//showInvite({
//  email: 'teste@test.com',
//  phone: '999'
//  ref:100 
//)}
document.querySelector("header").onclick = () => startApp()
