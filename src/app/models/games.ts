export interface Games{
    "gameId": number,
    "players": Players,
    "status": string,
    "deck": Cards,
    "maxPlayer": number,
    "currentCard": CurrentCard,
    "player": any
    
}

export interface Players{
    "playerId": string,
    "username": string,
    "table": any,
    "winner": boolean
}

export interface Cards{
    "idCard": number,
    "image": string,
    "phrase": string,
    "name": string,
    "number": number,
    "state": boolean
}

export interface CurrentCard{
    "idCard": number,
    "image": string,
    "phrase": string,
    "name": string,
    "number": number,
    "state": boolean

}

export interface Player{
    "playerId": string,
    "username": string,
    "winner": boolean
  }




[
    {
      "gameId": "string",
      "players": [
        {
          "playerId": "string",
          "username": "string",
          "table": {
            "table": {
              "additionalProp1": {
                "idCard": 0,
                "image": "string",
                "phrase": "string",
                "name": "string",
                "number": 0,
                "state": true
              },
              "additionalProp2": {
                "idCard": 0,
                "image": "string",
                "phrase": "string",
                "name": "string",
                "number": 0,
                "state": true
              },
              "additionalProp3": {
                "idCard": 0,
                "image": "string",
                "phrase": "string",
                "name": "string",
                "number": 0,
                "state": true
              }
            },
            "upTable": {
              "cards": [
                {
                  "idCard": 0,
                  "image": "string",
                  "phrase": "string",
                  "name": "string",
                  "number": 0,
                  "state": true
                }
              ]
            }
          },
          "winner": true
        }
      ],
      "status": "NEW",
      "deck": {
        "cards": [
          {
            "idCard": 0,
            "image": "string",
            "phrase": "string",
            "name": "string",
            "number": 0,
            "state": true
          }
        ]
      },
      "maxPlayer": 0,
      "currentCard": {
        "idCard": 0,
        "image": "string",
        "phrase": "string",
        "name": "string",
        "number": 0,
        "state": true
      },
      "player": {
        "playerId": "string",
        "username": "string",
        "table": {
          "table": {
            "additionalProp1": {
              "idCard": 0,
              "image": "string",
              "phrase": "string",
              "name": "string",
              "number": 0,
              "state": true
            },
            "additionalProp2": {
              "idCard": 0,
              "image": "string",
              "phrase": "string",
              "name": "string",
              "number": 0,
              "state": true
            },
            "additionalProp3": {
              "idCard": 0,
              "image": "string",
              "phrase": "string",
              "name": "string",
              "number": 0,
              "state": true
            }
          },
          "upTable": {
            "cards": [
              {
                "idCard": 0,
                "image": "string",
                "phrase": "string",
                "name": "string",
                "number": 0,
                "state": true
              }
            ]
          }
        },
        "winner": true
      }
    }
  ]