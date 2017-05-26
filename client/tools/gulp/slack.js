import gulp from 'gulp'
import { IncomingWebhook } from '@slack/client'

gulp.task('slack', (done) => {
  let url = process.env.SLACK_WEBHOOK_URL || ''
  let webhook = new IncomingWebhook(url)

  webhook.send({
    attachments: [
      {
        text: '',
        pretext: `:robot_face: The latest ${process.env.PROJECT_NAME} has been deployed :rocket:`,
        title: `${process.env.DOCKER_URL}`,
        title_link: `${process.env.DOCKER_URL}`,
        color: '#7CD197',
        fields: [
          {
            title: 'Project Name',
            value: `${process.env.PROJECT_NAME}`,
            short: true
          },
          {
            title: 'CDN Version',
            value: `${process.env.CDN_VERSION}`,
            short: true
          }
        ]
      }
    ],
    channel: process.env.SLACK_CHANNEL || '@g',
    'username': 'herman-scheer-bot'
  }, (err, res) => {
    if (err) console.log('Error', err)
    done()
  })
})
