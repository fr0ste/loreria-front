export interface Games{
    gameId: number,
    players: Players[],
    status: string,
    deck: Cards,
    maxPlayer: number,
    currentCard: CurrentCard,
    player: any
    
}

export interface Players{
    playerId: string,
    username: string,
    table: any,
    winner: boolean
}

export interface Cards{
    idCard: number,
    image: string,
    phrase: string,
    name: string,
    number: number,
    state: boolean,
    left?: string;
    zIndex?: number;
    transform?: string;
}

export interface CurrentCard{
    idCard: number,
    image: string,
    phrase: string,
    name: string,
    number: number,
    state: boolean

}

export interface Player{
    playerId: string,
    username: string,
    winner: boolean
  }

  export interface Deck {
    cards: Cards[];
  }


  export interface Game {
    gameId: string;
    players?: any[];
    maxPlayers: number;
    status: string;
    currentCard?: any; // Ajusta según la estructura real de la carta
    deck: Deck;
  }