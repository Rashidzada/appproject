from django.shortcuts import render
from .models import Project, Skill, Contact
from .forms import ContactForm
from django.contrib import messages

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
            messages.success(request, 'Your message has been sent successfully!')
            form = ContactForm()
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
