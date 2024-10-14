
import './styles.css';
import { FaTrash } from 'react-icons/fa';
import api from '../../services/api'
import { useEffect, useState } from 'react';

function Home() {
  const [users , setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    contact: ''
  })

  async function getUsers(){
    const response = await api.get('/users')
    setUsers(response.data)
  }

  //mudança
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  //envio
  async function  handleSubmit(e){
    e.preventDefault()
  
      await api.post('/users', formData);
      setFormData({ name: '', email: '', contact: '' });
      getUsers();
}

  async function handleDelete(id) {
    try {
      await api.delete(`/users/${id}`);
      getUsers(); 
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }



  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form >
        <h1>Cadastro de Usuários</h1>

        

        <input type="text"
        name='name' 
        placeholder='Seu nome'
        value={formData.name}
        onChange={handleChange}
        />
        <input type="text"  
        name='email'  
        placeholder='Seu email'
        value={formData.email}
        onChange={handleChange}

        />
       
        <input type="text"  
        name='contact'  
        placeholder='DDD + Whatsapp'
        value={formData.contact}
        onChange={handleChange}
        />

        <button type='button' onClick={handleSubmit}>Cadastrar</button>
      </form>

        {users.map((user) => (
          <div key= {user.id} className = "user-card">
            <div>
              <p>Nome: <span>{user.name}</span> </p>
              <p>Email:<span> {user.email}</span> </p>
              <p>Contato:<span>{user.contact}</span> </p>
            </div>
            <button onClick={() => handleDelete(user.id)}>
            <FaTrash />
            </button>
          </div>
        ))}
  </div>

  
  )
}

// async function handleDelete(id) {
//   try {
//     await api.delete(`/users/${id}`);
//     // Atualize a lista de usuários depois de deletar
//     getUsers();
//   } catch (error) {
//     console.error("Erro ao deletar usuário:", error);
//   }
// }

export default Home;
