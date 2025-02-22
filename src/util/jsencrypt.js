import {JSEncrypt} from "jsencrypt";

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtmN3QOY9HYWlPvQbzi3I\n' +
    'At/fAUxiiG8iCrIjMKlR1tN3naC0RQmUUfHYksqGsjmBa/kkur8IlM87L9WsvjNC\n' +
    'gIRW2VyoAHABUPucwTVUgWO0k7iRMlOQh+OK4gOkBai8e9ByrbEnqbJ+Uii2R8Fn\n' +
    '1w6zv+WFksM9mj9syMTMO73P0t7kXz04C7Gp8Scq+WxSqI3quAqoequi22D77jky\n' +
    'EDB8OwDRnIPkT0LpBudP3oyn73h5ulu+XOyyc3vKlRB0PBzmwEOhM66nVE+XU1tD\n' +
    'Yx44qURMyoUyowUWLb88bUpTa4wMstCNoLP6NwbPFhJ8+/OyF4OCz+js5nPvLZ37\n' +
    '6QIDAQAB'

const privateKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC2Y3dA5j0dhaU+\n' +
    '9BvOLcgC398BTGKIbyIKsiMwqVHW03edoLRFCZRR8diSyoayOYFr+SS6vwiUzzsv\n' +
    '1ay+M0KAhFbZXKgAcAFQ+5zBNVSBY7STuJEyU5CH44riA6QFqLx70HKtsSepsn5S\n' +
    'KLZHwWfXDrO/5YWSwz2aP2zIxMw7vc/S3uRfPTgLsanxJyr5bFKojeq4Cqh6q6Lb\n' +
    'YPvuOTIQMHw7ANGcg+RPQukG50/ejKfveHm6W75c7LJze8qVEHQ8HObAQ6EzrqdU\n' +
    'T5dTW0NjHjipREzKhTKjBRYtvzxtSlNrjAyy0I2gs/o3Bs8WEnz787IXg4LP6Ozm\n' +
    'c+8tnfvpAgMBAAECggEATotRLOq6AP+v5Qd8/fJrQwmj4MxDVpv9XfvO+cLBErGo\n' +
    'voIZf+2bKRrseHKtRQ1MtfHqJl3kVSlVRMlRBevPRMc5G4wycVXKy1Q/8liEFuCY\n' +
    'QFFoffLMuCh+g8yrkyBSY0OmTzSObx8GFV2g+g/JJy0WrZorRsO7wLR1pZRSm5rt\n' +
    'IyaSZHzIp0+okP4SlAj+9Hl1XgEvBo/dVExCZGepgMVX9rBF7fEbOiLyHrI7I3IF\n' +
    'PpUfrZoheaPyrs6c/I4n2g7ZVeBnXAiT78irr8xsV/MwOBmqACI5hhOPknwFKcTN\n' +
    'htCYcOJ5OMfODcQqfIKAXKyaVsryXAEyvEmMPWonsQKBgQDhJnQOVciY6nldjHEu\n' +
    'eIZ1ychaLFty4PE237didn2SyL4JGlb7IJtprlT/KpYDsOaVMTocDHquJPm+U8St\n' +
    '1mA2kBVssj9i/xbV4P60Dp/Z8tYjdYKya6SioLhlW3Ea1BQ3qq8psfDa2cb75t7R\n' +
    'Rhe4gTxvqzirWscMHVVF3N49dQKBgQDPYRIC/YkAgtNz0UVze1dq+/5WzEMfpuQC\n' +
    '9kTrH9s097DGvYBVixLo6oI06gUkZcRmK1B+6EldnHKXprOV75Po4MAWY6noFcWL\n' +
    'HRXOe8MzxgDN7DMAwKNktlLFbfXuiGdgl/+knIIbVO0O89eyMZIHvtYlESFL/PpX\n' +
    'c7xJKH1yJQKBgQDGD8HAao5QltO1C7r1GmmObLenO6Ym5OLNVvhH0dydp6Ik99rU\n' +
    'h9avnQCAh8H39UKis+9ehUvWrghU+fPmyNNSrGVsfVFtkOFRvN/THZpZbFocT19t\n' +
    '/WuS9LfB0jMpWq9+WNRGZZZvr2xwZKRWjMaJNIcp5QGxG+ZGLfe5wZZvkQKBgQC9\n' +
    'iFFG7GNfVTJe4r/f6LWfsMnmmG8sqYIw9tVMM2RMB6jIKv/0rtPMjjAMnmmut1gF\n' +
    'rMa4BiKvbMIKui/d9AWxzF+i1tm9pNBT8XQxsElaszee/KYspONws3X4vSQNKxuY\n' +
    'W7MoxmXfBwJWLSRQ1x9I9vCPFhXhdkdyz/MgxeHJBQKBgQCVYbnM9YN0DdPuZAKL\n' +
    '7kUojBoRznQPEkZoj+4aB3Vwgj33uG/9Lf2BKjYK0hbXfISHtxWQyv8wlBk1i4gL\n' +
    'vA/fACu09NIFSgUyIhlGybdCASW3T95ODZR7GboxffquwajeBIlPj4z8qwsQvEq5\n' +
    '/KDRCZWC96eh5pn/yPNxk1Rgjg=='

// 加密
export function encrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)  // 设置公钥
    return encryptor.encrypt(txt)  // 对数据进行加密
}

// 解密
export function decrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey)  // 设置私钥
    return encryptor.decrypt(txt)  // 对数据进行解密
}