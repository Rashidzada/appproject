from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Project, Skill, Contact

# Create your views here.

def home(request):
    projects = Project.objects.all().order_by('-created_at')
    backend_skills = Skill.objects.filter(category='backend')
    frontend_skills = Skill.objects.filter(category='frontend')
    
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        if name and email and message:
            Contact.objects.create(
                name=name,
                email=email,
                message=message
            )
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
            return redirect('home')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    context = {
        'projects': projects,
        'backend_skills': backend_skills,
        'frontend_skills': frontend_skills,
    }
    return render(request, 'portfolio/home.html', context)
