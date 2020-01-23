from django.shortcuts import render


def index(request):
    context = {}
    return render(request, 'goldApp/index.html', context)
    # template = loader.get_template('goldApp/index.html')
    # return HttpResponse(template.render(request))

# Create your views here.





