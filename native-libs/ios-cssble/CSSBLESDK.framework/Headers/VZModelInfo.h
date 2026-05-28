//
//  VZModelInfo.h
//  VanZooBLESDK
//
//  Created by fangyong on 2021/11/16.
//

#import <Foundation/Foundation.h>

@interface VZPpgData : NSObject
/// ppg data
@property (nonatomic, strong) NSArray *acDataList;
@property (nonatomic, assign) NSInteger isWear; //  1: wear  0: Not wear
@property (nonatomic, assign) NSInteger currentIndex;
@property (nonatomic, assign) NSInteger totalNumber;
@property (nonatomic, assign) NSInteger dcData;
///  heart rate
@property (nonatomic, assign) NSInteger heartRate;
/// ambient temperature
@property (nonatomic, assign) NSInteger temp;
/// diastolic pressure
@property (nonatomic, assign) NSInteger bloodLow;
///  systolic pressure
@property (nonatomic, assign) NSInteger bloodhigh;
@property (nonatomic, assign) NSInteger x;
@property (nonatomic, assign) NSInteger y;
@property (nonatomic, assign) NSInteger z;
@end

@interface VZPressureData : NSObject
/// Timestamp of pressure measurement
@property (nonatomic, assign) NSInteger time;
/// pressure value
@property (nonatomic, assign) NSInteger value;

@end

@interface VZHRVData : NSObject
/// Timestamp of hrv measurement
@property (nonatomic, assign) NSInteger time;
/// hrv value
@property (nonatomic, assign) NSInteger value;

@end

@interface VZAutoMeasureConfig : NSObject
// 0 Heart rate 1 Blood oxygen  2 Blood pressure 3 Body temperature 4 HRV 5 pressure
@property (nonatomic, assign) NSInteger type;
// 0 off  1 on
@property (nonatomic, assign) NSInteger isOpen;
// interval  The unit is minute. The maximum value is 1440. 0 indicates off.
@property (nonatomic, assign) NSInteger interval;

@end


@interface VZResponseSport : NSObject

// 0 Motion stops
// 1 The movement begins
// 2 In motion
@property (nonatomic, assign) NSInteger action;

// 0 "Run ",
// 1 "Hiking ",
// 2 "Mountaineering ",
// 3 "Ride ",
@property (nonatomic, assign) NSInteger type;

@property (nonatomic, assign) NSInteger time;

// Heart rate
@property (nonatomic, assign) NSInteger heartRate;
// Number of steps
@property (nonatomic, assign) NSInteger step;
// Body temperature
@property (assign, nonatomic) float bodyTemperature;

@end


@interface VZMeasureActionRes : NSObject
// 0 heart rate
// 1 Blood oxygen
// 2 Blood pressure
// 3 Body temperature
@property (nonatomic, assign) NSInteger type;

// Measurement results
//00 Successfully collected
//01 Failed to collect data
//02 Not wearing a ring
//03 Collection process
//04 The collection stops
@property (nonatomic, assign) NSInteger result;
/// Heart rate, blood oxygen, systolic pressure, body temperature 0.1 degrees such as 36.5 for 365
/// Collect data 1
@property (nonatomic, assign) NSInteger data1;
// Collect data 2
// Diastolic pressure
@property (nonatomic, assign) NSInteger data2;
/// Collection time Indicates the UTC timestamp
@property (nonatomic, assign) NSInteger time;

@end

@interface VZUserInfo : NSObject
/// Sex 0 male 1 female
@property (nonatomic, assign) NSInteger sex;
/// Height cm
@property (nonatomic, assign) NSInteger height;
/// Weight unit 0.1 kg Example: 502 indicates a weight of 50.2kg
@property (nonatomic, assign) NSInteger weight;
/// Birth year
@property (nonatomic, assign) NSInteger birthYear;
/// Birth month
@property (nonatomic, assign) NSInteger birthMonth;
/// Birth date
@property (nonatomic, assign) NSInteger birthDay;

@end

/// Status of all alarms 0: Off 1: On
@interface VZAllAlarmClockSwitch : NSObject
/// Alarm clock 1
@property (nonatomic, assign) NSInteger alarmClock1;
/// Alarm clock 2
@property (nonatomic, assign) NSInteger alarmClock2;
/// Alarm clock 3
@property (nonatomic, assign) NSInteger alarmClock3;
/// Alarm clock 4
@property (nonatomic, assign) NSInteger alarmClock4;
/// Alarm clock 5
@property (nonatomic, assign) NSInteger alarmClock5;

@end


@interface VZSyncSwitchType : NSObject
/// Raise the wrist and light up the screen
@property (nonatomic, assign) NSInteger brightScreen;
/// Do not disturb mode
@property (nonatomic, assign) NSInteger notDisturb;
/// The alarm is on or off
@property (nonatomic, assign) NSInteger alarmClock;
///BT3.0 status
@property (nonatomic, assign) NSInteger bt3;
/// Firmware log output status
@property (nonatomic, assign) NSInteger log;

@end




@interface VZNotificationInfo : NSObject
/// If the value is 0, it is off. 1 is on. Do not set any other value ！！！！！！
@property (assign, nonatomic) NSInteger otherApp;

@property (assign, nonatomic) NSInteger facebook;

@property (assign, nonatomic) NSInteger gmail;

@property (assign, nonatomic) NSInteger instagegrm;

@property (assign, nonatomic) NSInteger line;

@property (assign, nonatomic) NSInteger linkedin;

@property (assign, nonatomic) NSInteger qq;

@property (assign, nonatomic) NSInteger skype;

@property (assign, nonatomic) NSInteger snapchat;

@property (assign, nonatomic) NSInteger talk;

@property (assign, nonatomic) NSInteger telegram;

@property (assign, nonatomic) NSInteger twitter;

@property (assign, nonatomic) NSInteger wechat;

@property (assign, nonatomic) NSInteger weibo;

@property (assign, nonatomic) NSInteger whatsApp;

@property (assign, nonatomic) NSInteger mail;

@property (assign, nonatomic) NSInteger message;

@property (assign, nonatomic) NSInteger call;

@property (assign, nonatomic) NSInteger tim;

@property (assign, nonatomic) NSInteger dingding;

@property (assign, nonatomic) NSInteger douyin;

@property (assign, nonatomic) NSInteger alipay;

@property (assign, nonatomic) NSInteger viber;

@end


@interface VZFirmwareInfo : NSObject

/// Project ID
@property (assign, nonatomic) NSInteger serialNum;
/// Customer Type 1: Huaxinzhi 2-255: Reserved extension
@property (assign, nonatomic) NSInteger clientType;
/// Area type 1: internal single 2: external single 3-255: Reserved extension
@property (assign, nonatomic) NSInteger areaType;
/// Dial shape 1: round 2: Square 3-255: reserved expansion
@property (assign, nonatomic) NSInteger dialShape;
/// Dial size wide
@property (assign, nonatomic) NSInteger dialWidth;
/// Dial size is high
@property (assign, nonatomic) NSInteger dialHeight;
/// Product model Example: "x6b". The value can contain a maximum of 12 characters
@property (strong, nonatomic) NSString *productModel;
/// Firmware version number format: xx.xx, a string format. Example: "1.0"
@property (strong, nonatomic) NSString *firmwareVer;
/// Protocol version number format: xxx.xxx.xxx. Example: "1.0.0"
@property (strong, nonatomic) NSString *protocolVer;
/// Adaptation number    Such as： 9B03
@property (strong, nonatomic) NSString *adaptationNum;

@end

#pragma mark - Body temperature
@interface VZBodyTemperature : NSObject

/// Temperature value
@property (assign, nonatomic) float temperature;

/// timestamp
@property (assign, nonatomic) NSInteger time;

@end


#pragma mark - Sedentary reminder
@interface VZSedentaryReminder : NSObject

/// Reminder mode switch: 0: off,1: on
@property (assign, nonatomic) NSInteger enable;
/// Start time - hours
@property (assign, nonatomic) NSInteger startHour;
/// Start time - minutes
@property (assign, nonatomic) NSInteger startMin;
/// End time - hour
@property (assign, nonatomic) NSInteger endHour;
/// End time - minutes
@property (assign, nonatomic) NSInteger endMin;
/// Reminder interval, unit minute, minimum adjustment unit 5 minutes, range 5-60 minutes
@property (assign, nonatomic) NSInteger interval;
/// Do not disturb Start time - hour
@property (assign, nonatomic) NSInteger notDisturbStartHour;
/// Do not disturb Start time - minutes
@property (assign, nonatomic) NSInteger notDisturbStartMin;
/// DND End time - hour
@property (assign, nonatomic) NSInteger notDisturbEndHour;
/// DND End time - minutes
@property (assign, nonatomic) NSInteger notDisturbEndMin;
/// Step threshold. The minimum adjustment unit is 100. The value ranges from 100 to 500 steps
@property (assign, nonatomic) NSInteger stepThreshold;

@end

#pragma mark - Drink water reminder
@interface VZDrinkWaterReminder : NSObject

/// Reminder mode switch: 0: off,1: on
@property (assign, nonatomic) NSInteger enable;
/// Start time - hours
@property (assign, nonatomic) NSInteger startHour;
/// Start time - minutes
@property (assign, nonatomic) NSInteger startMin;
/// End time - hour
@property (assign, nonatomic) NSInteger endHour;
/// End time - minutes
@property (assign, nonatomic) NSInteger endMin;
/// Reminder interval, unit minute, minimum adjustment unit 5 minutes, range 5-60 minutes
@property (assign, nonatomic) NSInteger interval;
/// Do not disturb Start time - hour
@property (assign, nonatomic) NSInteger notDisturbStartHour;
/// DND Start time - minutes
@property (assign, nonatomic) NSInteger notDisturbStartMin;
/// DND End time - hour
@property (assign, nonatomic) NSInteger notDisturbEndHour;
/// DND End time - minutes
@property (assign, nonatomic) NSInteger notDisturbEndMin;

@end

#pragma mark - Alarm clock reminder
@interface VZClockReminder : NSObject

/// Alarm id
@property (assign, nonatomic) NSInteger clockId;
/// Alarm switch: 0: off,1: on
@property (assign, nonatomic) NSInteger enable;
/// Alarm clock time - hours
@property (assign, nonatomic) NSInteger hour;
/// Alarm time - minutes
@property (assign, nonatomic) NSInteger min;
/// Remind the switch only once, 0: off,1: on
@property (assign, nonatomic) NSInteger oneTimeEnable;
/// Monday reminder switch
@property (assign, nonatomic) NSInteger day1Enable;
/// Tuesday reminder switch
@property (assign, nonatomic) NSInteger day2Enable;
/// Wednesday reminder switch
@property (assign, nonatomic) NSInteger day3Enable;
/// Thursday reminder switch
@property (assign, nonatomic) NSInteger day4Enable;
/// Friday reminder switch
@property (assign, nonatomic) NSInteger day5Enable;
/// Saturday alert switch
@property (assign, nonatomic) NSInteger day6Enable;
/// Sunday reminder switch
@property (assign, nonatomic) NSInteger day7Enable;

@end

#pragma mark - Do not disturb mode
@interface VZNotDisturb : NSObject

/// Do not disturb mode switch, 0: off,1 on
@property (assign, nonatomic) NSInteger enable;
///  Start time - hours
@property (assign, nonatomic) NSInteger startHour;
///   Start time - minutes
@property (assign, nonatomic) NSInteger startMin;
///   End time - hour
@property (assign, nonatomic) NSInteger endHour;
///   End time - minutes
@property (assign, nonatomic) NSInteger endMin;

@end


#pragma mark - Raise wrist light screen control
@interface VZBrightScreen : NSObject

/// Wrist lift screen light switch, 0: off,1 on
@property (assign, nonatomic) NSInteger enable;

/// Raise the wrist and light up the screen. Start time hour
@property (assign, nonatomic) NSInteger startHour;

///  Raise the wrist and turn on the screen. Start time minutes
@property (assign, nonatomic) NSInteger startMin;

/// Raise the wrist and light up the screen. Start End time Minutes
@property (assign, nonatomic) NSInteger endMin;

/// Raise the wrist and light up the screen. Start End Time Hour
@property (assign, nonatomic) NSInteger endHour;

@end

#pragma mark - weather
@interface VZWeather : NSObject

/// Weather types Today
@property (assign, nonatomic) NSInteger weather;

/// Current temperature
@property (assign, nonatomic) NSInteger temperature;
/// Today's minimum temperature
@property (assign, nonatomic) NSInteger lowTemperature;
/// Today's maximum temperature
@property (assign, nonatomic) NSInteger highTemperature;
///  Weather types tomorrow
@property (assign, nonatomic) NSInteger weather1;
/// Tomorrow's minimum temperature
@property (assign, nonatomic) NSInteger lowTemperature1;
///  Tomorrow's maximum temperature
@property (assign, nonatomic) NSInteger highTemperature1;
///  Day after tomorrow weather type
@property (assign, nonatomic) NSInteger weather2;
///  Acquired minimum temperature
@property (assign, nonatomic) NSInteger lowTemperature2;
///  Postnatal maximum temperature
@property (assign, nonatomic) NSInteger highTemperature2;

@end


#pragma mark - Segmented steps
@interface VZSegmentStep : NSObject
/// Step number
@property (assign, nonatomic) NSInteger step;
/// calorie
@property (assign, nonatomic) NSInteger calories;
/// Start time
@property (assign, nonatomic) NSInteger startTime;
/// End time
@property (assign, nonatomic) NSInteger endTime;

@end

#pragma mark - Step statistics (by day)
@interface VZTotalStep : NSObject

/// Distance unit meter
@property (assign, nonatomic) NSInteger distance;

/// Step number
@property (assign, nonatomic) NSInteger step;
/// Calories in kilocalories
@property (assign, nonatomic) NSInteger calories;
/// Statistical day time
@property (assign, nonatomic) NSInteger date;

@end



#pragma mark - Sleep detail data
@interface VZSleepDetail : NSObject

/// Bedtime start time
@property (assign, nonatomic) NSInteger startTime;
/// bedtime
@property (assign, nonatomic) NSInteger endTime;

// Sleep type 0: light sleep 1: deep sleep 2: awake
@property (assign, nonatomic) NSInteger sleepType;

@end

#pragma mark - Sleep data
@interface VZSleep : NSObject
/// Collect the time stamp
@property (assign, nonatomic) NSInteger statisticTime;
/// Sleep hours 0-23
@property (assign, nonatomic) NSInteger startSleepHour;
/// Sleep minutes 0-59
@property (assign, nonatomic) NSInteger startSleepMin;
/// Waking hours 0-23
@property (assign, nonatomic) NSInteger endSleepHour;
/// Wake up minutes 0-59
@property (assign, nonatomic) NSInteger endSleepMin;
/// Total duration unit minute
@property (assign, nonatomic) NSInteger totalTimes;
/// Deep sleep duration unit minutes
@property (assign, nonatomic) NSInteger deepSleepTimes;
/// Light sleep duration unit minutes
@property (assign, nonatomic) NSInteger lightSleepTimes;
/// Waking duration unit minute
@property (assign, nonatomic) NSInteger wakeupTimes;

@property (copy, nonatomic) NSArray<VZSleepDetail *> *detailList;

@end


#pragma mark - Automatic heart rate
@interface VZAutoHeart : NSObject

/// Heart rate
@property (assign, nonatomic) NSInteger heartRate;

/// Heart rate time
@property (assign, nonatomic) NSInteger time;

@end

#pragma mark - Automatic blood oxygen
@interface VZAutoOxygen : NSObject

/// Blood oxygen
@property (assign, nonatomic) NSInteger oxygen;

/// Oxygen time
@property (assign, nonatomic) NSInteger time;

@end

@interface VZBloodPressure : NSObject

/// hypotension
@property (assign, nonatomic) NSInteger lowBloodPressure;
/// hypertension.
@property (assign, nonatomic) NSInteger highBloodPressure;
/// Blood pressure time
@property (assign, nonatomic) NSInteger time;

@end

@interface VZEcg : NSObject

/// Ecg (electrocardio)
@property (assign, nonatomic) NSInteger ecg;
/// Ecg time
@property (assign, nonatomic) NSInteger time;

@end


#pragma mark - Sports details
@interface VZSportDetail : NSObject
/// time
@property (assign, nonatomic) NSInteger time;
/// Heart rate
@property (assign, nonatomic) NSInteger heartRate;
/// Step number
@property (assign, nonatomic) NSInteger step;
/// distance
@property (assign, nonatomic) NSInteger distance;

@end

#pragma mark - movement
@interface VZSport : NSObject

/// Exercise type 1 -- outdoor mode 2 -- indoor mode 3 -- walking mode 4 -- cycling mode
@property (assign, nonatomic) NSInteger type;
/// Start time
@property (assign, nonatomic) NSInteger startTime;
/// End time
@property (assign, nonatomic) NSInteger endTime;
/// Total steps
@property (assign, nonatomic) NSInteger totalStep;
/// Total distance
@property (assign, nonatomic) NSInteger totalDistance;
/// Total calories
@property (assign, nonatomic) NSInteger totalCalories;
/// Every 3 minutes, save heart rate, steps, distance
@property (strong, nonatomic) NSArray <VZSportDetail *> *sportDetailList;

@end


#pragma mark - The most recent data
@interface VZLastData : NSObject

/// Recentt daily steps
@property (assign, nonatomic) NSInteger step;
/// Recent time you slept
@property (assign, nonatomic) NSInteger sleepTime;
/// Recent ECG
@property (assign, nonatomic) NSInteger ecg;
/// Recent heart rate
@property (assign, nonatomic) NSInteger heartRate;
/// Recent oxygenation
@property (assign, nonatomic) NSInteger bloodOxygen;
/// Recent hypertension
@property (assign, nonatomic) NSInteger bloodHighPressure;
/// Recent hypotension
@property (assign, nonatomic) NSInteger bloodLowPressure;
/// Recent sport type
@property (assign, nonatomic) NSInteger sportType;
/// Recent distance in meters
@property (assign, nonatomic) NSInteger distance;
/// Day distance unit meter
@property (assign, nonatomic) NSInteger totalDisatnce;
/// Daily calories in kilocalories
@property (assign, nonatomic) NSInteger totalCalorie;
/// Recent temperature
@property (assign, nonatomic) float bodyTemperature;
/// HRV (Heart rate variability)
@property (assign, nonatomic) NSInteger hrv;
/// Pressure
@property (assign, nonatomic) NSInteger pressure;
/// Battery value
@property (assign, nonatomic) NSInteger battery;

@end

#pragma mark - Address book
@interface VZContact : NSObject

/// name
@property (strong, nonatomic) NSString *name;
/// number
@property (strong, nonatomic) NSString *phone;

@end


#pragma mark - Customize the watch face configuration information

@interface VZDialConfig : NSObject

/// Time display position 0: The time is displayed at the top 1: the time is displayed at the bottom
@property (assign, nonatomic) NSInteger timePosition;

/// Display content above the time 0: No display 1: heart rate display 2: sleep display 3: step display 4: date display
@property (assign, nonatomic) NSInteger timeTop;

/// Under the time display content 0: No display 1: heart rate display 2: sleep display 3: step display 4: date display
@property (assign, nonatomic) NSInteger timeDown;

/// Displays the font color ARGB value
///

@property (assign, nonatomic) NSInteger alpha;

@property (assign, nonatomic) NSInteger red;

@property (assign, nonatomic) NSInteger green;

@property (assign, nonatomic) NSInteger blue;

@end
