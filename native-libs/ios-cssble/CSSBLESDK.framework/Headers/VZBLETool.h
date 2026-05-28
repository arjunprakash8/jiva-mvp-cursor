//
//  VZBLETool.h
//  VanZooBLESDK
//
//  Created by fangyong on 2021/11/15.
//

#import <UIKit/UIKit.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "VZDefine.h"

/**
 Bluetooth interactive SDK api interface class
 Before invoking the api, be sure to use the VZCentralManager object to scan the connected device, otherwise the api call will not work
 And make sure the device is connected
 */

@interface VZBLETool : NSObject
// SDK log switch
@property (nonatomic, assign) BOOL enableLog;

// singleton
+ (instancetype)shareTool;

/**
 Obtain the version number of VanzooBLESDK (version number: xx.xx.xx)
 */
+ (NSString *)getSDKVersion;

/**
 Minimum Bluetooth protocol version number supported by sdk (version number: xx.xx.xx)
 */
+ (NSString *)getSupportProtocolVersion;

/**
 Obtain the Bluetooth protocol version number on the device (version number: xx.xx.xx)
 */
- (void)getDeviceProtocolVersionCallBack:(GetProtocolCallback)callBack;

/**
 Obtain the device software version. (This method is not recommended. You are advised to use - (void)getFirmwareInfoCallBack:(FirmwareCallback)callBack to obtain the device software version.)
 */
- (void)getDeviceSoftWareVersionCallBack:(GetDeviceSWCallback)callBack;

/**
 Obtain the device hardware version
 */
- (void)getDeviceHardWareVersionCallBack:(DeviceHWCallback)callBack;

/**
 Get device name
 */
- (void)getDeviceNameCallBack:(DeviceNameCallback)callBack;

/**
 Get Firmware Information
 */
- (void)getFirmwareInfoCallBack:(FirmwareCallback)callBack;

/**
 Get current power (1-100)
 */
- (void)getBatteryLevelCallBack:(BatteryLevelCallBack)callBack;

/**
 Synchronize the phone system time
 */
- (void)setDeviceTime;

/**
 Send time system
 @param hourSystem Hour 0 indicates 24 hours 1 indicates 12 hours
*/
- (void)setHourAndSystem:(NSInteger)hourSystem;

/**
 Gets the custom id of the device dial
 */
- (void)getDialPlateIdCallBack:(DialPlateIdCallback)callBack;

/**
 Set device language
 * @param language Language
 * 0- English
 * 1- Chinese
 * 2- Japanese
 * 3- Russian
 * 4- French
 * 5- Italian
 * 6- German
 * 7- Portuguese
 * 8- Spanish
 * 9- Thai language
 *10- Turkey
 *11- Arab
 *12- Hebrew
 *13- India
 *14- Persian
 *15- Polish
 *16: Czech
 *17: Greek
 *18: Latin
 *19: Romanian
 *20: Dutch
 *21: Vietnamese
 *22: Danish
 *23: Philippines
 *24: Malaysia
 *25: Azerbaijan
 *26: Armenia
 *27: Georgia
 */
- (void)setLanguage:(NSInteger)language;

/**
 * Find a device
 * 1- Start looking
 * 2- Stop looking
 */
- (void)setFindPhone:(NSInteger)status;

/**
 * Temperature unit setting
 * 0: degrees Celsius
 * 1: Degrees Fahrenheit
 */
- (void)setTemperatureUnit:(NSInteger)unit;

/**
 * Set up automatic heart rate test
 *@param time Unit min Maximum 1440 0 Indicates that the value is disabled
     */
- (void)setAutoHeart:(NSInteger)time;


/**
 Sedentary reminder
 */
- (void)setSedentaryReminder:(VZSedentaryReminder *)reminder;

/**
 Drink water reminder
*/
- (void)setDrinkWaterReminder:(VZDrinkWaterReminder *)reminder;

/**
 Alarm clock reminder
 */
- (void)setClockReminder:(VZClockReminder *)reminder;

/**
 Obtain the status of all alarm switches synchronously
 */
- (void)getClockSwitchCallBack:(ClockSwitchCallBack)callBack;


/**
 Do not disturb mode Settings
 */
- (void)setNotDisturbMode:(VZNotDisturb *)notDisturb;

/**
 Synchronize the switch status. Raise the wrist screen, do not disturb mode, and firmware log
 */
- (void)getSyncCommonSwitchCallBack:(SyncCommonSwitchCallBack)callBack;


/**
 Wrist lift screen Settings
 */
- (void)setBrightScreen:(VZBrightScreen *)brightScreen;


/**
 Ecg measurement control 0: off 1: on
 */
- (void)ecgMeasurementOpen:(NSInteger)open;

/**
 Bluetooth camera control 0: off 1: on
 */
- (void)setTakePhotoOpen:(NSInteger)open;

/**
 Send weather to the device
 */
- (void)setWeather:(VZWeather *)weaterBean;


/**
 Listen to the camera command on the watch
 */
- (void)listenCmdTakePhoto:(TakePhotoCallback)callback;


/**
 Monitor the battery reported by the watch
 */
- (void)listenBatteryLevel:(BatteryLevelCallBack)callback;

/**
 Monitor the Settings reported by the watch (@“CMD_FIND_PHONE” indicates the command to find the mobile phone, @ “CMD_REQUEST_SYNC_TIME” indicates the command to synchronize the mobile phone time)
 */
- (void)listenSettingInfo:(SettingInfoCallback)callback;

/**
 Synchronize step counting data
 */
- (void)syncSegmentStepData:(SegmentStepCallback)callback;

/**
 Synchronize real-time step counting data
 */
- (void)syncTotalStepData:(TotalStepCallback)callback;

/**
 Synchronize sleep segment data
 */
- (void)syncSleepData:(SleepCallback)callback;

/**
 Sync automatic heart rate data
 Contains previous heart data, please save the data yourself to avoid duplication
 */
- (void)syncAutoHeartData:(AutoHeartCallback)callback;
/**
 Synchronize automatic blood oxygen data
 Contains previous oxygen data, please save the data yourself to avoid duplication
 */
- (void)syncAutoOxygenData:(AutoOxygenCallback)callback;
/**
 Sync automatic blood pressure data
 */
- (void)syncBloodPressureData:(BloodPressureCallback)callback;

/**
 Monitor ECG test data
 */
- (void)syncEcgData:(EcgCallback)callback;

// Synchronize automatic ECG data
- (void)syncAutoEcgData:(EcgCallback)callback;

/**
 Synchronous motion data
 */
- (void)syncSportData:(SportCallback)callback;

/**
 Example Synchronize the latest data
 */
- (void)syncLastData:(LastDataCallback)callback;


/**
 Synchronized temperature data
 Contains previous temperature data, please save the data yourself to avoid duplication
 */
- (void)syncBodyTemperatureData:(TemperatureCallBack)callback;

/**
 Push address listcontactList Indicates the incoming address book list (a maximum of 10 entries). The VZContact type is as follows:
 */
- (void)pushContact:(NSArray <VZContact *> *)contactList
 onPushDataComplete:(PushDataComplete)complete
            onError:(PushDataError)failure;

/**
 Push individual dial data
 */
- (void)pushDialPlate:(NSString *)path
  blePushDataProgress:(PushDataProgress)pushProgress
   onPushDataComplete:(PushDataComplete)complete
              onError:(PushDataError)failure;

/**
 Push a custom watch face background image!!!!!!! Note that the picture needs to be the width and height of the actual size of the dial (can be passed by - (void)getFirmwareInfoCallBack:(FirmwareCallback)callBack; Method to get)
 */
- (void)pushCustomDialPlate:(UIImage *)image
        blePushDataProgress:(PushDataProgress)pushProgress
         onPushDataComplete:(PushDataComplete)complete
                    onError:(PushDataError)failure;


/**
 Push custom watch face configuration
 */
- (void)pushCustomDialConfig:(VZDialConfig *)config;

/// Switch the watch to boot mode
/// After entering boot, use GRDFUSDK to upgrade the dfu
- (void)switchToBoot;


/**
 unbind
 */
- (void)unbind;


/// Push QR code id and content
/// @param qrId QR code id
/// 0: wechat payment code
// 1: QQ payment code
// 2: Alipay payment code
// 3: Pay Pal code
// 4: wechat QR code business card
// 5: QQ QR code business card
// 6: Facebook QR code business card
// 7: Twitter QR code business card
// 8: Instagegrm QR Code business card
// 9: Skype QR Code business card
// 10: line QR code business card
// 11: whats QR Code Business Card
/// @param content Indicates the string content of the two-dimensional code
- (void)pushQRCode:(NSInteger)qrId content:(NSString *)content;



/// Set the application message notification switch
/// @param notificationInfo message object
- (void)setNotificationInfo:(VZNotificationInfo *)notificationInfo;


/// BT3.0 status of the device
/// @param callback callback The first parameter: 0 No pairing (or shutdown) 1 The pairing succeeds. The second parameter: BT Mac address (actual BT3.0 6 bytes) The last two bytes are ignored. The third parameter: Phone MAC 6 bytes, the last 2 bytes will not be considered
- (void)getDeviceBT3StatusCallback:(BT3StatusCallBack)callback;



/// Set the BT3.0 switch status
/// @param status 0: disabled 1: enabled
- (void)setDeviceBT3SwitchStatus:(NSInteger)status;

/// Set the switch status. Raise the wrist screen, do not disturb mode, and firmware log
/// @param type 0: off 1: on
- (void)sendSyncDeviceSwitchType:(VZSyncSwitchType *)type;

/// Synchronize the firmware log
/// @param callback log and timestamp
- (void)getFirmwareLogCallback:(FirmwareLogCallBack)callback;

/// Set the status of firmware log
/// @param status 0: disabled 1: enabled
- (void)setFirmwareLogSwitchStatus:(NSInteger)status;

/// Set user information to be uploaded to the watch
/// @param userInfo User information object
- (void)setUserInfo:(VZUserInfo *)userInfo;

/// Read the watch's personal information
/// @param callback Callback of user information
- (void)getUserInfoCallback:(UserInfoCallBack)callback;

/// Firmware system Settings (for ring devices only)
/// @param settingType Setting type
/// 0: The system restarts
/// 1: Shutdown
/// 2: system formatting
/// 3: User deletes personal information
/// 4: Deletes pairing information
- (void)writeForSystemSettingType:(NSInteger)settingType;

/// Get device system Settings notification (for ring devices only)
/// @param callback Callback
- (void)getDeviceSystemSettingCallback:(VZSystemSettingCallBack)callback;

/// Set the ring device motion (for ring devices only)
/// @param sportType Sets the sport type
/// @param action Action 0: Movement stops 1: movement 2: movement in progress (need to be adjusted every 5 seconds)
- (void)setDeviceSportType:(NSInteger)sportType action:(NSInteger)action time:(NSInteger)time;

/// Get the type and state of the ring device motion  (for ring devices only)
- (void)getDeviceSportActionCallback:(SportActionCallBack)callback;


/// Set ring device measurement (for ring devices only)
/// @param type Measurement type
/// 0: heart rate
/// 1: Blood oxygen
/// 2: Blood pressure
/// 3: Body temperature
/// 4: ambient temperature
/// 5: HRV (Heart rate variability)
/// 6: pressure
/// 7: Heart rate with 25Hz ppg data output
/// 8:Heart rate with 5Hz ppg data output
/// 9:ECG
/// 10 pretest

/// /// @param action Indicates the action
/// 0: Stop
/// 1: Start
/// 5: measuring (need to adjust once every 5 seconds)
- (void)setDeviceMeasureType:(VZMeasureType)type action:(VZMeasureAction)action;

// Get the result of the ring device measurement action
- (void)getDeviceMeasureActionCallback:(VZDeviceMeasureActionCallBack)callback;

/// Listen for the received automatic detection configuration,
/// whether the read or write operation is performed, the callback here will return the result
- (void)listenAutoMeasureConfigCallback:(VZAutoMeasureConfigCallBack)callback;

/// Set up heart rate,HRV, blood oxygen, blood pressure, body temperature，pressure。automatic test
/// @param config Configuration information
- (void)setAutoMeasureConfig:(VZAutoMeasureConfig *)config;


/// Read automatic test configuration information
/// @param type  -1 Read all types of configurations 0 Heart rate 1 Blood oxygen  2 Blood pressure 3 Body temperature 4 HRV 5 pressure 6 ppg
- (void)getAutoMeasureConfigType:(NSInteger)type;


/// Receive hrv data uploaded by the device
/// Contains previous hrv data, please save the data yourself to avoid duplication
/// @param callback hrv data list callback
- (void)syncHRVData:(VZHRVDataCallback)callback;

/// Receive pressure data uploaded by the device
/// Contains previous pressure data, please save the data yourself to avoid duplication
/// @param callback pressure data list callback
- (void)syncPressureData:(VZPressureDataCallback)callback;

/// Get Firmware function data
/// Call this method, and the data will be callback in syncXXXXData:(VZDataCallback);
/// @param functionType
///  1:  Sleep
///  2：Step
///  3:  Heart rate
///  4:  oxygen
///  5:  blood pressure
///  6:  finger temperature
///  7:  hrv
///  8:  pressure
- (void)getFirmwareFunctionData:(NSInteger)functionType;

/// Send sleep start and end commands
- (void)controlSleepAction:(VZSleepAction)action;

///  Read ppg data. The ppg data will be output in the - (void)listenPpgDataCallback: callback.
///  ** Please note that this method can only be called to read ppg data after starting ppg measurement,
///  ** otherwise no data can be read.(To start ppg measurement, see - (void)setDeviceMeasureType:action: )
- (void)readPpgData;

/// Can get ppg data in the callback
- (void)listenPpgDataCallback:(VZPpgDataCallback)callback;

- (void)listenECG125HZDataCallback:(VZECG125HZDataCallback)callback;

/// Get RRI data
- (void)getRRIDataCallback:(VZRRIDataCallback)callback;

/// Clear RRI data
- (void)clearRRIData;
@end
