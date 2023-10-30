import axios from 'axios'
import React, { Component } from 'react'

export default class ListUser extends Component {

    state = {
        users: [],
        activeId:0,
        posts:[]
    }

    render() {
        return (
            <div className='list'>
                <h1>Nombre d'utilisateurs : {this.state.users.length}</h1>
                {this.state.users.map(u => 
                    <div key={u.id} className='user'>
                        <h3>Nom : {u.name}</h3>
                        <p>Email : {u.email}</p>
                        <p>Ville : {u.address.city} Rue:{u.address.street}</p>
                        <button onClick={() => this.setState({activeId:u.id})} disabled={u.id===this.state.activeId}>Details posts</button>

                        {
                            this.state.activeId === u.id && 
                            <div className='posts'>
                                <h2>Nombre de posts : {this.state.posts.length}</h2>
                                {
                                    this.state.posts.map(p => 
                                        <div key={p.id} className='post'>
                                            <h3>{p.title}</h3>
                                            <p>{p.body}</p>
                                        </div>
                                        )
                                }
                            </div>
                        }
                    </div>
                    )}
            </div>
        )
    }

    componentDidMount(){
        const getData = async () => {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            return await res.data;
        }

        getData().then(utilisateurs => this.setState({users: utilisateurs}))
    }

    componentDidUpdate(prevprops, prevstate){
        if(prevstate.activeId !== this.state.activeId){
            const getData = async () => {
                const res = await axios.get("https://jsonplaceholder.typicode.com/posts?userId="+this.state.activeId);
                return await res.data;
            }
    
            getData().then(posts => this.setState({posts: posts}))
        }
    }


}
