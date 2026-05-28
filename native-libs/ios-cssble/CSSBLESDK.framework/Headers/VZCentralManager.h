//
//  VZCentralManager.h
//  VanZooBLESDK
//
//  Created by fangyong on 2021/11/18.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>
@class VZBLEDeviceInfo;
/**
 You can also use the registration notification to monitor the Bluetooth status. VZDefine contains the name of the notification
 */
@protocol VZCentralManagerDelegate <NSObject>


- (void)centralManagerInConnectingPeripheral:(VZBLEDeviceInfo *)deviceInfo;
- (void)centralManagerConnectPeripheralSucceed:(VZBLEDeviceInfo *)deviceInfo;
- (void)centralManagerConnectPeripheralFailed:(VZBLEDeviceInfo *)deviceInfo;
- (void)centralManagerDidDisconnectPeripheral:(VZBLEDeviceInfo *)deviceInfo;
- (void)peripheralDidUpdateValueForCharacteristic:(CBCharacteristic *)characteristic;
- (void)peripheralDidUpdateNotificationStateForCharacteristic:(CBCharacteristic *)characteristic;
- (void)peripheraldidWriteValueForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error;

@end

//Package device information
@interface VZBLEDeviceInfo : NSObject

@property (strong, nonatomic) CBPeripheral *peripheral;

@property (strong, nonatomic) NSString *uuid;
// Such as AA:BB:CC:DD
@property (strong, nonatomic) NSString *macAddress;

/// Initialization method
/// @param peripheral 外设
/// @param macAddress macAddress mac addresses of peripherals (separated by colons in uppercase format AA:BB:CC:DD)
- (instancetype)initWithPeripheral:(CBPeripheral *)peripheral macAddress:(NSString *)macAddress;

/// Initialization method
/// @param uuid Peripheral uuid
/// @param macAddress macAddress mac addresses of peripherals (separated by colons in uppercase format AA:BB:CC:DD)
- (instancetype)initWithUuid:(NSString *)uuid macAddress:(NSString *)macAddress;

@end

/**
 Please use VZCentralManager for Bluetooth peripheral connection
 */
@interface VZCentralManager : NSObject
/**
 Bluetooth proxy object
 */
@property (weak, nonatomic) id<VZCentralManagerDelegate> delegate;
/*
 System Bluetooth center management
 */
@property (readonly,strong, nonatomic) CBCentralManager *centralManager;
/*
 The currently connected device
 */
@property (readonly,strong, nonatomic) CBPeripheral *currentPeripheral;

+ (instancetype)defaultManager;

/// Method of connecting devices
/// @param centralManager Center Manager
/// @param deviceInfo Peripheral object
- (void)centralManager:(CBCentralManager *)centralManager connectPeripheral:(VZBLEDeviceInfo *)deviceInfo;

- (void)disconnectCurrentPeripheral;

@end
