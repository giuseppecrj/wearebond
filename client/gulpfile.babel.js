import yargs from 'yargs'
import requireDir from 'require-dir'
import dotenv from 'dotenv'

dotenv.load()

process.env.NODE_ENV = process.env.NODE_ENV || yargs.argv.env || 'development'
process.noDeprecation = true
requireDir('./tools/gulp', { recurse: true })
