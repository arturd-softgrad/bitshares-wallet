assert = require 'assert'
ByteBuffer = require 'bytebuffer'
config = require '../chain/config'
hash = require '../common/hash'
base58 = require 'bs58'

class Address

    constructor: (@addy) ->
        
    Address.fromBuffer = (buffer) ->
        _hash = hash.sha512(buffer)
        addy = hash.ripemd160(_hash)
        new Address(addy)
    
    Address.fromString = (string, address_prefix = config.address_prefix) ->
        prefix = string.slice 0, address_prefix.length
        assert.equal address_prefix, prefix, "Expecting key to begin with #{address_prefix}, instead got #{prefix}"
        addy = string.slice address_prefix.length
        addy = new Buffer(base58.decode(addy), 'binary')
        checksum = addy.slice -4
        addy = addy.slice 0, -4
        new_checksum = hash.ripemd160 addy
        new_checksum = new_checksum.slice 0, 4
        assert.deepEqual checksum, new_checksum, 'Checksum did not match'
        new Address(addy)
    
    ###* @return Address - Compressed PTS format (by default) ###
    Address.fromPublic = (public_key, compressed = true, version = 56) ->
        sha2 = hash.sha256 public_key.toBuffer compressed
        rep = hash.ripemd160 sha2
        versionBuffer = new Buffer(1)
        versionBuffer.writeUInt8((0xFF & version), 0)
        addr = Buffer.concat [versionBuffer, rep]
        check = hash.sha256 addr
        check = hash.sha256 check
        buffer = Buffer.concat [addr, check.slice 0, 4]
        new Address hash.ripemd160 buffer
    
    toBuffer: ->
        @addy
        
    toString: (address_prefix = config.address_prefix) ->
        checksum = hash.ripemd160 @addy
        addy = Buffer.concat [@addy, checksum.slice 0, 4]
        address_prefix + base58.encode addy

module.exports = Address
