//
//  VZDefine.h
//  VanZooBLESDK
//
//  Created by fangyong on 2021/11/5.
//

#import <Foundation/Foundation.h>
#import "VZModelInfo.h"


typedef NS_ENUM(NSUInteger, VZCommonSwitchType) {
    VZCommonSwitchTypeBrightScreen  =  0, // Raise the wrist to light the screen
    VZCommonSwitchTypeNotDisturb,         // Do not disturb mode
    VZCommonSwitchTypeLog,                // Firmware log
};

typedef enum : NSUInteger {
    VZSportTypeRunning = 0, // Running
    VZSportTypeWalking = 1, // Running
    VZSportTypeClimbing = 2,// Mountaineering
    VZSportTypeRiding = 3   // Riding
} VZSportType;

typedef enum : NSUInteger {
    VZSleepActionStart,  // Fall asleep
    VZSleepActionEnd     // wake up
} VZSleepAction;

typedef NS_ENUM(NSUInteger, VZMeasureType) {
    VZMeasureTypeHeartRate = 0,
    VZMeasureTypeOxygen = 1,
    VZMeasureTypeBloodPressure = 2,
    VZMeasureTypeBodyTemperature = 3,
    VZMeasureTypeAmbientTemperature = 4,
    VZMeasureTypeHRV = 5,
    VZMeasureTypePressure = 6,
    VZMeasureTypePPG25HZ = 7,
    VZMeasureTypePPG5HZ = 8,
    VZMeasureTypeECG = 9,
    VZMeasureTypePretest = 10,
    
};

typedef NS_ENUM(NSUInteger, VZMeasureAction) {
    VZMeasureActionStop = 0,
    VZMeasureActionStart = 1,
    VZMeasureActionListener = 5,
    VZMeasureActionFinish = 6,
    VZMeasureActionDelete = 7
};


typedef void(^BatteryLevelCallBack)(NSInteger);

typedef void(^GetProtocolCallback)(NSString *);

typedef void(^GetDeviceSWCallback)(NSString *);

typedef void(^DeviceNameCallback)(NSString *);

typedef void(^FirmwareCallback)(VZFirmwareInfo *);

typedef void(^DeviceHWCallback)(NSString *);

typedef void(^DialPlateIdCallback)(NSString *);

typedef void(^TakePhotoCallback)(NSInteger);

typedef void(^SettingInfoCallback)(NSString *);

typedef void(^SegmentStepCallback)(NSArray <VZSegmentStep *> *);

typedef void(^TotalStepCallback)(NSArray <VZTotalStep *> *);

typedef void(^SleepCallback)(NSArray <VZSleep *> *);

typedef void(^AutoHeartCallback)(NSArray <VZAutoHeart *> *);

typedef void(^AutoHeartCallback)(NSArray <VZAutoHeart *> *);

typedef void(^AutoOxygenCallback)(NSArray <VZAutoOxygen *> *);

typedef void(^AutoOxygenCallback)(NSArray <VZAutoOxygen *> *);

typedef void(^BloodPressureCallback)(NSArray <VZBloodPressure *> *);

typedef void(^EcgCallback)(NSArray <VZEcg *> *);

typedef void(^SportCallback)(VZSport *);

typedef void(^LastDataCallback)(VZLastData *);

typedef void(^PushDataProgress)(NSInteger progress);

typedef void(^PushDataComplete)(void);

typedef void(^PushDataError)(NSString *msg);

typedef void(^TemperatureCallBack)(NSArray <VZBodyTemperature *> *);

typedef void(^SyncCommonSwitchCallBack)(VZCommonSwitchType ,BOOL);

typedef void(^ClockSwitchCallBack)(VZAllAlarmClockSwitch *);

typedef void(^BT3StatusCallBack)(NSInteger,NSString *, NSString *);

typedef void(^FirmwareLogCallBack)(NSInteger,NSString *);

typedef void(^UserInfoCallBack)(VZUserInfo *);

typedef void(^SportActionCallBack)(VZResponseSport *);

typedef void(^VZSystemSettingCallBack)(NSInteger action);

typedef void(^VZDeviceMeasureActionCallBack)(VZMeasureActionRes *);

typedef void(^VZAutoMeasureConfigCallBack)(NSArray<VZAutoMeasureConfig *> *);

typedef void(^VZHRVDataCallback)(NSArray <VZHRVData *> *);

typedef void(^VZPressureDataCallback)(NSArray <VZPressureData *> *);

typedef void(^VZPpgDataCallback)(VZPpgData *);

typedef void(^VZECG125HZDataCallback)(NSArray *);

typedef void(^VZRRIDataCallback)(NSData *, CGFloat offset, NSInteger total);

//DFU
typedef void(^DfuPrepareBlock)(BOOL);
typedef void(^DfuStartBlock)(void);
typedef void(^DfuProgressBlock)(NSInteger progress);
typedef void(^DfuCompleteBlock)(void);
typedef void(^DfuErrorBlock)(NSString *);








# pragma mark - VANZOO notification

//Bluetooth system notification
//centralManager status did change notification
#define VANZOONotificationAtCentralManagerDidUpdateState @"VANZOONotificationAtCentralManagerDidUpdateState"
//did discover peripheral notification
#define VANZOONotificationAtDidDiscoverPeripheral @"VANZOONotificationAtDidDiscoverPeripheral"
//did connection peripheral notification
#define VANZOONotificationAtDidConnectPeripheral @"VANZOONotificationAtDidConnectPeripheral"
//did filed connect peripheral notification
#define VANZOONotificationAtDidFailToConnectPeripheral @"VANZOONotificationAtDidFailToConnectPeripheral"
//did disconnect peripheral notification
#define VANZOONotificationAtDidDisconnectPeripheral @"VANZOONotificationAtDidDisconnectPeripheral"
//did discover service notification
#define VANZOONotificationAtDidDiscoverServices @"VANZOONotificationAtDidDiscoverServices"
//did discover characteristics notification
#define VANZOONotificationAtDidDiscoverCharacteristicsForService @"VANZOONotificationAtDidDiscoverCharacteristicsForService"
//did read or notify characteristic when received value  notification
#define VANZOONotificationAtDidUpdateValueForCharacteristic @"VANZOONotificationAtDidUpdateValueForCharacteristic"
//did write characteristic and response value notification
#define VANZOONotificationAtDidWriteValueForCharacteristic @"VANZOONotificationAtDidWriteValueForCharacteristic"
//did change characteristis notify status notification
#define VANZOONotificationAtDidUpdateNotificationStateForCharacteristic @"VANZOONotificationAtDidUpdateNotificationStateForCharacteristic"





@interface VZDefine : NSObject

@end
