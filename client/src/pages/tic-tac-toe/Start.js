import React, { useEffect } from 'react';
import Choice from '../../components/functional/Choice.js'
import InputForm from '../../components/functional/InputForm.js'
import Loading from '../../components/functional/Loading'
import Error from '../../components/functional/Error'
import logo from './logo.png'
import { getAccount } from "../../utils/wallet";
import { buyTicketOperation } from "../../utils/operation";

import {Navigate} from 'react-router-dom'

import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:4000/'

class Start extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            name: '',
            newGame: null,
            room: '',
            loading: false,
            serverConfirmed: false,
            error: false,
            errorMessage: '',
            walletAccount: '',
            transLoading: false,
            isStaked: false,
        }
    }
    
    componentDidMount(){
        this.socket = socketIOClient(ENDPOINT)
        this.socket.on('newGameCreated', (room) =>{
            this.setState({serverConfirmed:true, room:room})
        })
        this.socket.on('joinConfirmed', ()=>{
            this.setState({serverConfirmed:true})
        })
        this.socket.on('errorMessage', (message) => this.displayError(message))
    }


    componentWillUnmount(){
        this.socket.disconnect()
    }

    onChoice = (choice)=>{
        const gameChoice = choice==='new'?true:false
        const newState = {newGame: gameChoice}
        this.setState(newState, ()=>{
            this.stepForward()
        })
    }

    validate = ()=>{
        if (this.state.newGame){
            return !(this.state.name==='')
        }else{
            return !(this.state.name==='') && !(this.state.room==='')
        }
    }

    onSubmit = ()=>{
        this.setState({loading: true})
        if (this.validate()){
            if (this.state.newGame){
                this.socket.emit('newGame')
            }else{
                this.socket.emit('joining', {room:this.state.room})
            }
        }else{
            setTimeout(()=>this.setState({loading: false }), 500)
            this.displayError(this.state.newGame? 'Please fill out your name':'Please fill out your name and room id')
        }
    }

    stepBack = ()=>{
        this.setState({step: this.state.step - 1})
    }

    stepForward = () =>{
        this.setState({step: this.state.step + 1})
    }

    onTyping = (e)=>{
        const target = e.target.name
        const newState = {[target]:e.target.value}
        this.setState(newState)
    }

    displayError = (message) =>{
        this.setState({error:true, errorMessage:message, loading:false})
        setTimeout(()=>{
            this.setState({error:false, errorMessage:''})
        }, 3000)
    }
    
    onStake = async () => {
        try {
            this.transLoading = true;
            const res = await buyTicketOperation();
            alert("1 TEZOS is now on stake")
            this.isStaked = true;
          } catch (error) {
            throw error;
          }
          this.transLoading = false;
    }

    render(){
        if (this.state.serverConfirmed){
            return(
                <Navigate to={`/tic-tac-toe/game?room=${this.state.room}&name=${this.state.name}`} />
            )
        }else{
            switch(this.state.step){
                case(1):
                    return (
                        <Choice logo={logo} onChoice={this.onChoice}/>
                    );
                case(2):
                    return (
                        <>
                            <Loading loading={this.state.loading}/>
                            <Error display={this.state.error} message={this.state.errorMessage}/>
                            <InputForm 
                                stepBack={this.stepBack} 
                                onSubmit={this.onSubmit} 
                                onStake={this.onStake}
                                onTyping={this.onTyping.bind(this)}
                                newGame={this.state.newGame}
                                name = {this.state.name}
                                room = {this.state.room}
                                isStaked = {this.state.isStaked}
                                /> 
                        </>
                    );
                default:
                    return null
            }
        }
        
    }
    
}

export default Start;