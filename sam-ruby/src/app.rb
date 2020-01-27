# require 'httparty'
require 'json'

def get_prompt(event:, context:)

  {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
   },
    body: {
      prompt: "How did i get here?",
      # location: response.body
    }.to_json
  }
end

def put_answer(event:, context:)

  {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
   },
    body: {
      message: "Everything is fine!",
      # location: response.body
    }.to_json
  }
end

def get_answers(event:, context:)

  {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
   },
    body: {
      answers: [
      ],
      # location: response.body
    }.to_json
  }
end
