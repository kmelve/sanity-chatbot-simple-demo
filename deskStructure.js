import S from '@sanity/desk-tool/structure-builder'

export default S.list()
  .title('Content')
  .items([
    S.listItem()
      .title('Chatbots')
      .schemaType('chatbot')
      .child(
        S.list()
          .title('Chatbot')
          .items([
            S.listItem()
              .title('Questions by chatbot')
              .schemaType('question')
              .child(
                S.documentList()
                  .title('Questions by chatbot')
                  .menuItems(S.documentTypeList('chatbot').getMenuItems())
                  .filter('_type == "chatbot"')
                  .child(botId =>
                    S.documentList()
                      .title(
                        `Questions`
                      )
                      .menuItems(S.documentTypeList('question').getMenuItems())
                      .filter(
                        '_id in *[_id == $id][0].questions[]._ref'
                      )
                      .params({
                        id: botId
                      })
                  )
              )
          ])
      ),
    ...S.documentTypeListItems()
  ])
