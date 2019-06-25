package com.jasonix.practicestudent;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.TimeZone;

public class CheckinFragment extends Fragment {

    TextView comeTimeTextView;
    TextView goTimeTextView;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_checkin,container,false);
    }

    @SuppressLint("SetTextI18n")
    public void onStart() {
        super.onStart();
        TextView timeTextView =
                Objects.requireNonNull(getActivity()).findViewById(R.id.time_textView);
        comeTimeTextView =
                Objects.requireNonNull(getActivity()).findViewById(R.id.cometime_textView);
        goTimeTextView =
                Objects.requireNonNull(getActivity()).findViewById(R.id.gotime_textView);
        timeTextView.setText(getDateString());
        @SuppressLint("SimpleDateFormat") SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        String time = sdf.format(new Date(System.currentTimeMillis()));
        comeTimeTextView.setText("上班时间："+time);
        goTimeTextView.setText("下班时间："+time);
        IntentFilter filter=new IntentFilter();
        filter.addAction(Intent.ACTION_TIME_TICK);
        getActivity().registerReceiver(receiver,filter);
    }

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @SuppressLint("SetTextI18n")
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            assert action != null;
            if (action.equals(Intent.ACTION_TIME_TICK)) {
                @SuppressLint("SimpleDateFormat") SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
                String time = sdf.format(new Date(System.currentTimeMillis()));
                comeTimeTextView.setText("上班时间："+time);
                goTimeTextView.setText("下班时间："+time);
            }
        }
    };

    public static String getDateString(){
        final Calendar c = Calendar.getInstance();
        c.setTimeZone(TimeZone.getTimeZone("GMT+8:00"));
        @SuppressLint("SimpleDateFormat") SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日");
        Date date = new Date(System.currentTimeMillis());
        String timeString = format.format(date);
        String mWay = String.valueOf(c.get(Calendar.DAY_OF_WEEK));
        switch (mWay) {
            case "1":
                mWay = "日";
                break;
            case "2":
                mWay = "一";
                break;
            case "3":
                mWay = "二";
                break;
            case "4":
                mWay = "三";
                break;
            case "5":
                mWay = "四";
                break;
            case "6":
                mWay = "五";
                break;
            case "7":
                mWay = "六";
                break;
        }
        return timeString + " 星期"+mWay;
    }
}
