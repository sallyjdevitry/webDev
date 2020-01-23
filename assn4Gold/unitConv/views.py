from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.template import Template
from django.db import models
from unitConv.models import Conversions
from django.http import JsonResponse

def createConversionInstances(request):
    print ('create conversion Instances worked')
    # myMass = Mass(t_oz=14.5833, lb=1, T=0.0005, g=453.592, kg=0.4536, oz=16)
    # myLen = Length(ft=1, nm=0.00016458, inch=12, m=.3048, cm=30.48, mi=0.00018939)
    # myVol = Volume(l=1, gal=.264172, oz=33.814, T=67.628, ml=1000, bbl=.00838641)
    # myTime = Time(h=1, s=3600, m=60, d=24, ft=0.00297619, y=0.00011416)
    
    row1 = Conversions.objects.create(unit="lb", value=1, theType="mass")
    row2 = Conversions.objects.create(unit="g", value=453.592, theType="mass")
    row3 = Conversions.objects.create(unit="t_oz", value=14.5833, theType="mass")
    row4 = Conversions.objects.create(unit="T", value=.0005, theType="mass")
    row5 = Conversions.objects.create(unit="kg", value=.4563, theType="mass")
    row6 = Conversions.objects.create(unit="oz", value=16, theType="mass")
    row7 = Conversions.objects.create(unit="ft", value=1, theType="length")
    row8 = Conversions.objects.create(unit="nm", value=.00016458, theType="length")
    row9 = Conversions.objects.create(unit="inch", value=12, theType="length")
    row10 = Conversions.objects.create(unit="m", value=.3048, theType="length")
    row11 = Conversions.objects.create(unit="cm", value=30.48, theType="length")
    row12 = Conversions.objects.create(unit="mi", value=.00018939, theType="length")
    row13 = Conversions.objects.create(unit="l", value=1, theType="volume")
    row14 = Conversions.objects.create(unit="gal", value=.264172, theType="volume")
    row15 = Conversions.objects.create(unit="oz", value=33.814, theType="volume")
    row16 = Conversions.objects.create(unit="T", value=67.628, theType="volume")
    row17 = Conversions.objects.create(unit="ml", value=1000, theType="volume")
    row18 = Conversions.objects.create(unit="bbl", value=.00838641, theType="volume")
    row19 = Conversions.objects.create(unit="h", value=1, theType="time")
    row20 = Conversions.objects.create(unit="s", value=3600, theType="time")
    row21 = Conversions.objects.create(unit="m", value=60, theType="time")
    row22 = Conversions.objects.create(unit="d", value=.0416666667, theType="time")
    row23 = Conversions.objects.create(unit="ft", value=.00297619, theType="time")
    row24 = Conversions.objects.create(unit="y", value=.00011416, theType="time")
    return redirect("index")
    #redirect to goldApp page
    # JsonResponse(myMass)

def doConversion(request):
    try:
        print("you got into the doConversions function")
        urlType = request.GET["type"]
        urlTo = request.GET["to"]
        urlFrom = request.GET["from"]
        urlValue = request.GET["value"]

        convFactTo = Conversions.objects.filter(unit=urlTo).filter(theType=urlType)[0].value
        convFactFrom = Conversions.objects.filter(unit=urlFrom).filter(theType=urlType)[0].value

        tempConvFactFrom = float(convFactFrom)
        tempConvFactTo = float(convFactTo)
        tempValue = float(urlValue)

        resultVal = (tempConvFactTo/tempConvFactFrom)*tempValue

        conversionDict = {
            'units' : urlTo,
            'value' : resultVal,
            'type' : urlType,
        }
        response = JsonResponse(conversionDict)
        response['Access-Control-Allow-Origin'] = '*'
        return response

    except:
        print("invalid API request!")
        conversionDict = {
            'error' : "Invalid unit conversion request"
        }
        response = JsonResponse(conversionDict)
        response['Access-Control-Allow-Origin'] = '*'
        return response


