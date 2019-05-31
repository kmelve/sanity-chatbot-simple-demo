// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import localeText from './localeText.js'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    localeText,
    {
      name: 'keyValue',
      type: 'object',
      title: 'Key and value',
      fields: [
        {
          name: 'key',
          type: 'string'
        },
        {
          name: 'label',
          type: 'text'
        },
        {
          name: 'value',
          type: 'string'
        }
      ],
      preview: {
        select: {
          title: 'label',
          subtitle: 'value'
        }
      }
    },
    {
      name: 'multipleChoice',
      type: 'object',
      title: 'Multiple choice',
      fields: [
        {
          name: 'choices',
          type: 'array',
          of: [
            {
              type: 'keyValue',
            }
          ]
        }
      ],
      preview: {
        select: {
          title: '_type',
          choices: 'choices'
        },
        prepare: ({title, choices = []}) => ({
          title,
          subtitle: `${choices.length} item${choices.length > 1 ? 's' : ''}`
        })
      }
    },
    {
      name: 'responseTypes',
      type: 'array',
      of: [
        {
          type: 'multipleChoice'
        },
        {
          type: 'textResponse'
        }
      ]
    },
    {
      name: 'textResponse',
      type: 'localeText',
      title: 'Response'
    },
    {
      name: 'question',
      type: 'document',
      title: 'Question',
      fields: [
        {
          name: 'id',
          type: 'string'
        },
        {
          name: 'response',
          type: 'responseTypes'
        },
        {
          name: 'questions',
          type: 'array',
          title: 'Questions',
          of: [
            {
              type: 'reference',
              to: [{ type: 'question' }]
            }
          ]
        }
      ],
      preview: {
        select: {
          title: 'id',
          subtitle: 'response.en'
        }
      }

    },
    {
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
  ])
})
