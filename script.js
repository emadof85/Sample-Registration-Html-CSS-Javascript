// Lightweight form validation and 'Other' reveal
(function(){
  const form = document.getElementById('registerForm');
  const proficiency = document.getElementById('proficiency');
  const otherWrap = document.getElementById('otherWrap');
  const otherInput = document.getElementById('otherText');
  const result = document.getElementById('result');

  function showOther(show){
    if(show){
      otherWrap.classList.remove('hidden');
      // trigger visible class for animated height
      requestAnimationFrame(()=>otherWrap.classList.add('visible'));
      otherWrap.setAttribute('aria-hidden','false');
      otherInput.setAttribute('required','');
      otherInput.focus();
    } else {
      // hide with animation then hide display
      otherWrap.classList.remove('visible');
      otherWrap.setAttribute('aria-hidden','true');
      otherInput.removeAttribute('required');
      // wait for transition then add hidden
      setTimeout(()=>otherWrap.classList.add('hidden'), 360);
      otherInput.value = '';
    }
  }

  proficiency.addEventListener('change', e=>{
    showOther(e.target.value === 'other');
  });

  // simple helper to set field error text
  function setError(field, message){
    const small = field.parentElement.querySelector('.error');
    small.textContent = message || '';
    if(message) field.setAttribute('aria-invalid','true'); else field.removeAttribute('aria-invalid');
  }

  function validateField(field){
    if(field.disabled) return true;
    const name = field.name;
    if(field.hasAttribute('required') && !field.value.trim()){
      setError(field,'This field is required');
      return false;
    }
    if(field.type === 'email' && field.value){
      // basic email regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(field.value)){
        setError(field,'Please enter a valid email');
        return false;
      }
    }
    if(field.hasAttribute('minlength')){
      const min = parseInt(field.getAttribute('minlength'),10);
      if(field.value.length < min){
        setError(field,`Must be at least ${min} characters`);
        return false;
      }
    }
    setError(field,'');
    return true;
  }

  // realtime validation on blur
  form.querySelectorAll('input,select').forEach(el=>{
    el.addEventListener('blur', ()=>validateField(el));
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    result.textContent = '';
    const fields = Array.from(form.elements).filter(el=>['INPUT','SELECT','TEXTAREA'].includes(el.tagName));
    let ok = true;
    fields.forEach(f=>{ if(!validateField(f)) ok=false; });

    if(!ok){
      result.textContent = 'Please fix errors above and try again.';
      return;
    }

    // build data preview
    const data = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      proficiency: form.proficiency.value === 'other' ? form.otherText.value.trim() : form.proficiency.value,
    };

    // store the registration in sessionStorage and redirect to success page
    try{
      sessionStorage.setItem('registration', JSON.stringify(data));
      // small UX: show a brief message then redirect
      result.textContent = 'Registration successful — redirecting...';
      form.reset();
      showOther(false);
      setTimeout(()=> location.href = 'success.html', 700);
    }catch(err){
      // fallback: if sessionStorage unavailable, show inline JSON
      result.textContent = 'Registration successful — ' + JSON.stringify(data, null, 2);
      form.reset();
      showOther(false);
    }
  });

  // initial state
  if(proficiency.value === 'other') showOther(true);
})();
