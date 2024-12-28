from django.shortcuts import render
from django.http import JsonResponse
from .models import Project, Skill, Contact
from .forms import ContactForm

# Create your views here.

def home(request):
    projects = Project.objects.all().order_by('-created_at')
    skills = Skill.objects.all()
    
    # Group skills by category
    frontend_skills = skills.filter(category='frontend')
    backend_skills = skills.filter(category='backend')
    other_skills = skills.filter(category='other')
    
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'status': 'success',
                    'message': 'Thank you for your message! I will get back to you soon.'
                })
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'status': 'error',
                    'message': 'Please check your input and try again.'
                })
    else:
        form = ContactForm()
    
    context = {
        'projects': projects,
        'frontend_skills': frontend_skills,
        'backend_skills': backend_skills,
        'other_skills': other_skills,
        'form': form
    }
    
    return render(request, 'portfolio/home.html', context)
