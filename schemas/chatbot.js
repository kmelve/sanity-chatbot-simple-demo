import client from 'part:@sanity/base/client'

export default {
  name: 'chatbot',
  type: 'document',
  title: 'Chatbot',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'questions',
      type: 'array',
      // https://www.sanity.io/docs/content-studio/validation
      validation: Rule => [
        Rule.unique().error('Only one of each question'),
        Rule.custom(async docs => {
          console.log(docs)
          const ids = docs.map(({_ref}) => _ref)
          const inChatbot = await client.fetch(`*[references($ids) && _type == "chatbot"]`, {ids})
          if (inChatbot.length > 1) {
            return `Question used in ${inChatbot.map(({name}) => name).join(', ')}`
          }
          return true
        })
      ],
      of: [
        {
          type: 'reference',
          to: [{
            type: 'question'
          }]
        }
      ]
    }
  ]
}
