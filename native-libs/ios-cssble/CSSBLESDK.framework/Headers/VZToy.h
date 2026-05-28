//
//  VZToy.h
//  VanZooBLESDK
//
//  Created by fangyong on 2021/11/5.
//

#import <UIKit/UIKit.h>
#import <CoreBluetooth/CoreBluetooth.h>
@interface VZToy : NSObject

// Hexadecimal to a common string.
+ (NSString *)ConvertHexStringToString:(NSString *)hexString;
// Convert an ordinary string to hexadecimal
+ (NSString *)ConvertStringToHexString:(NSString *)string;
//int to data
+(NSData *)ConvertIntToData:(NSInteger)i;
//data to int
+(NSInteger)ConvertDataToInt:(NSData *)data;
+(NSInteger)ConvertDataToSignedInt:(NSData *)data;
//long converts the byte array
+ (Byte *)long2Byte:(NSInteger)src length:(NSInteger)length;
// Byte array convert long
+ (NSInteger)byte2long:(Byte *)buffer length:(NSInteger)length;
+ (NSInteger)byte2Signedlong:(Byte *)buffer length:(NSInteger)length;

+ (NSData *)string2Data:(NSString *)string length:(NSInteger)length;

// Hexadecimal to a common string.
+ (NSData *)ConvertHexStringToData:(NSString *)hexString;
// Look up the CBCharacteristic according to UUIDString
+(CBCharacteristic *)findCharacteristicFormServices:(NSMutableArray *)services
                                         UUIDString:(NSString *)UUIDString;
// The image is in rgb565 format
+ (NSData *)imageToRGB565:(UIImage *)image;

+ (NSData *)float2Data:(float)f;

+ (NSInteger)translateVerStrToInt:(NSString *)version;

+ (NSString *)convertMacStringForData:(NSData *)data;


@end
