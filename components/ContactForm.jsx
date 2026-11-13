import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { sdk, contactConfigured } from "../runtime/data.js";

/* @yb-template ContactForm v2 – from the YeshBe component library. This copy is the app's own: change it freely. */
export default function ContactForm({
  collection = "ContactMessage",
  fields,
  layout = "split",
  email,
  phone,
  address,
  hours,
  publicSave,
  extra = {},
  onSent,
  labels = {},
}) {
  /* ★ every language this component speaks – the page's language picks (activeLang); English otherwise.
       labels={{ … }} still overrides any word. */
  const YB_WORDS = {"id":{"title":"Hubungi kami","subtitle":"Kirimi kami pesan dan kami akan segera membalas.","name":"Nama","email":"Email","phone":"Telepon","message":"Pesan","messagePh":"Ada yang bisa kami bantu?","send":"Kirim pesan","sending":"Mengirim…","required":"Wajib diisi","badEmail":"Masukkan alamat email yang valid","optional":"opsional","select":"Pilih…","failed":"Pesan Anda tidak terkirim. Silakan coba lagi.","done":"Pesan terkirim","doneSub":"Terima kasih telah menghubungi kami. Kami akan membalas secepatnya.","another":"Kirim pesan lain","emailLabel":"Email","phoneLabel":"Telepon","addressLabel":"Alamat","hoursLabel":"Jam buka"},"ar":{"title":"169\tتواصل معنا","subtitle":"435\tأرسل لنا رسالة وسنردّ عليك.","name":"240\tالاسم","email":"البريد الإلكتروني","phone":"الهاتف","message":"227\tالرسالة","messagePh":"179\tكيف يمكننا مساعدتك؟","send":"431\tإرسال الرسالة","sending":"جارٍ الإرسال…","required":"مطلوب","badEmail":"أدخل عنوان بريد إلكتروني صالحًا","optional":"اختياري","select":"اختر…","failed":"587\tلم يتم إرسال رسالتك. يُرجى المحاولة مرة أخرى.","done":"228\tتم إرسال الرسالة","doneSub":"490\tشكرًا لتواصلك معنا. سنردّ عليك في أقرب وقت ممكن.","another":"429\tإرسال رسالة أخرى","emailLabel":"البريد الإلكتروني","phoneLabel":"الهاتف","addressLabel":"25\tالعنوان","hoursLabel":"326\tساعات العمل"},"es":{"title":"Ponte en contacto","subtitle":"Envíanos un mensaje y te responderemos.","name":"Nombre","email":"Correo electrónico","phone":"Teléfono","message":"Mensaje","messagePh":"¿En qué podemos ayudarte?","send":"Enviar mensaje","sending":"Enviando…","required":"Obligatorio","badEmail":"Introduce un correo electrónico válido","optional":"opcional","select":"Elegir…","failed":"Tu mensaje no se envió. Inténtalo de nuevo.","done":"Mensaje enviado","doneSub":"Gracias por escribirnos. Te responderemos lo antes posible.","another":"Enviar otro mensaje","emailLabel":"Correo electrónico","phoneLabel":"Teléfono","addressLabel":"Dirección","hoursLabel":"Horario de apertura"},"tr":{"title":"İletişime geçin","subtitle":"Bize bir mesaj gönderin, size dönüş yapalım.","name":"Ad","email":"E-posta","phone":"Telefon","message":"Mesaj","messagePh":"Size nasıl yardımcı olabiliriz?","send":"Mesaj gönder","sending":"Gönderiliyor…","required":"Zorunlu","badEmail":"Geçerli bir e-posta adresi girin","optional":"isteğe bağlı","select":"Seçin…","failed":"Mesajınız gönderilemedi. Lütfen tekrar deneyin.","done":"Mesaj gönderildi","doneSub":"Bize ulaştığınız için teşekkürler. En kısa sürede yanıt vereceğiz.","another":"Başka bir mesaj gönder","emailLabel":"E-posta","phoneLabel":"Telefon","addressLabel":"Adres","hoursLabel":"Çalışma saatleri"},"he":{"title":"צור קשר","subtitle":"שלח לנו הודעה ונחזור אליך.","name":"שם","email":"אימייל","phone":"טלפון","message":"הודעה","messagePh":"איך אפשר לעזור?","send":"שליחת הודעה","sending":"שולח…","required":"שדה חובה","badEmail":"הזן כתובת אימייל תקינה","optional":"אופציונלי","select":"בחר…","failed":"ההודעה שלך לא נשלחה. נסה שוב.","done":"ההודעה נשלחה","doneSub":"תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.","another":"שליחת הודעה נוספת","emailLabel":"אימייל","phoneLabel":"טלפון","addressLabel":"כתובת","hoursLabel":"שעות פתיחה"},"ru":{"title":"Связаться с нами","subtitle":"Напишите нам, и мы вам ответим.","name":"Имя","email":"Эл. почта","phone":"Телефон","message":"Сообщение","messagePh":"Чем мы можем помочь?","send":"Отправить сообщение","sending":"Отправка…","required":"Обязательное поле","badEmail":"Введите корректный адрес электронной почты","optional":"необязательно","select":"Выберите…","failed":"Сообщение не отправлено. Попробуйте ещё раз.","done":"Сообщение отправлено","doneSub":"Спасибо за обращение! Мы ответим как можно скорее.","another":"Отправить ещё сообщение","emailLabel":"Эл. почта","phoneLabel":"Телефон","addressLabel":"Адрес","hoursLabel":"Часы работы"},"fr":{"title":"Contactez-nous","subtitle":"Envoyez-nous un message et nous vous répondrons.","name":"Nom","email":"E-mail","phone":"Téléphone","message":"Message","messagePh":"Comment pouvons-nous vous aider ?","send":"Envoyer le message","sending":"Envoi…","required":"Obligatoire","badEmail":"Saisissez une adresse e-mail valide","optional":"facultatif","select":"Choisir…","failed":"Votre message n'a pas été envoyé. Veuillez réessayer.","done":"Message envoyé","doneSub":"Merci de nous avoir contactés. Nous vous répondrons dès que possible.","another":"Envoyer un autre message","emailLabel":"E-mail","phoneLabel":"Téléphone","addressLabel":"Adresse","hoursLabel":"Horaires d'ouverture"},"th":{"title":"ติดต่อเรา","subtitle":"ส่งข้อความถึงเรา แล้วเราจะติดต่อกลับ","name":"ชื่อ","email":"อีเมล","phone":"โทรศัพท์","message":"ข้อความ","messagePh":"มีอะไรให้เราช่วยไหม","send":"ส่งข้อความ","sending":"กำลังส่ง…","required":"จำเป็น","badEmail":"กรุณากรอกอีเมลที่ถูกต้อง","optional":"ไม่บังคับ","select":"เลือก…","failed":"ข้อความของคุณยังไม่ได้ส่ง โปรดลองอีกครั้ง","done":"ส่งข้อความแล้ว","doneSub":"ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด","another":"ส่งข้อความอื่น","emailLabel":"อีเมล","phoneLabel":"โทรศัพท์","addressLabel":"ที่อยู่","hoursLabel":"เวลาทำการ"},"pt":{"title":"Entre em contato","subtitle":"Envie uma mensagem e retornaremos o contato.","name":"Nome","email":"E-mail","phone":"Telefone","message":"Mensagem","messagePh":"Como podemos ajudar?","send":"Enviar mensagem","sending":"Enviando…","required":"Obrigatório","badEmail":"Informe um endereço de e-mail válido","optional":"opcional","select":"Selecione…","failed":"Sua mensagem não foi enviada. Tente novamente.","done":"Mensagem enviada","doneSub":"Obrigado pelo contato. Responderemos o mais rápido possível.","another":"Enviar outra mensagem","emailLabel":"E-mail","phoneLabel":"Telefone","addressLabel":"Endereço","hoursLabel":"Horário de funcionamento"},"ro":{"title":"Ia legătura cu noi","subtitle":"Trimite-ne un mesaj și îți vom răspunde.","name":"Nume","email":"E-mail","phone":"Telefon","message":"Mesaj","messagePh":"Cu ce te putem ajuta?","send":"Trimite mesajul","sending":"Se trimite…","required":"Obligatoriu","badEmail":"Introdu o adresă de e-mail validă","optional":"opțional","select":"Alege…","failed":"Mesajul tău nu a fost trimis. Încearcă din nou.","done":"Mesaj trimis","doneSub":"Mulțumim că ne-ai scris. Îți vom răspunde cât mai curând.","another":"Trimite alt mesaj","emailLabel":"E-mail","phoneLabel":"Telefon","addressLabel":"Adresă","hoursLabel":"Program"},"de":{"title":"Kontakt aufnehmen","subtitle":"Senden Sie uns eine Nachricht – wir melden uns bei Ihnen.","name":"Name","email":"E-Mail","phone":"Telefon","message":"Nachricht","messagePh":"Wie können wir helfen?","send":"Nachricht senden","sending":"Wird gesendet…","required":"Erforderlich","badEmail":"Geben Sie eine gültige E-Mail-Adresse ein","optional":"optional","select":"Auswählen…","failed":"Ihre Nachricht wurde nicht gesendet. Bitte versuchen Sie es erneut.","done":"Nachricht gesendet","doneSub":"Danke für Ihre Nachricht. Wir antworten Ihnen so schnell wie möglich.","another":"Weitere Nachricht senden","emailLabel":"E-Mail","phoneLabel":"Telefon","addressLabel":"Adresse","hoursLabel":"Öffnungszeiten"},"uk":{"title":"Зв’язатися","subtitle":"Надішліть нам повідомлення, і ми з вами зв’яжемося.","name":"Ім’я","email":"Електронна пошта","phone":"Телефон","message":"Повідомлення","messagePh":"Чим можемо допомогти?","send":"Надіслати повідомлення","sending":"Надсилання…","required":"Обов’язкове поле","badEmail":"Введіть дійсну адресу електронної пошти","optional":"необов’язково","select":"Виберіть…","failed":"Ваше повідомлення не надіслано. Спробуйте ще раз.","done":"Повідомлення надіслано","doneSub":"Дякуємо за звернення. Ми відповімо якнайшвидше.","another":"Надіслати ще одне повідомлення","emailLabel":"Електронна пошта","phoneLabel":"Телефон","addressLabel":"Адреса","hoursLabel":"Години роботи"},"fa":{"title":"تماس با ما","subtitle":"برای ما پیام بفرستید تا با شما تماس بگیریم.","name":"نام","email":"ایمیل","phone":"تلفن","message":"پیام","messagePh":"چطور می‌توانیم کمکتان کنیم؟","send":"ارسال پیام","sending":"در حال ارسال…","required":"الزامی","badEmail":"یک نشانی ایمیل معتبر وارد کنید","optional":"اختیاری","select":"انتخاب کنید…","failed":"پیام شما ارسال نشد. لطفاً دوباره تلاش کنید.","done":"پیام ارسال شد","doneSub":"از تماس شما سپاسگزاریم. در اولین فرصت پاسخ می‌دهیم.","another":"ارسال پیام دیگر","emailLabel":"ایمیل","phoneLabel":"تلفن","addressLabel":"نشانی","hoursLabel":"ساعات کاری"},"it":{"title":"Contattaci","subtitle":"Inviaci un messaggio e ti risponderemo.","name":"Nome","email":"Email","phone":"Telefono","message":"Messaggio","messagePh":"Come possiamo aiutarti?","send":"Invia messaggio","sending":"Invio in corso…","required":"Obbligatorio","badEmail":"Inserisci un indirizzo email valido","optional":"facoltativo","select":"Scegli…","failed":"Il messaggio non è stato inviato. Riprova.","done":"Messaggio inviato","doneSub":"Grazie per averci contattato. Ti risponderemo il prima possibile.","another":"Invia un altro messaggio","emailLabel":"Email","phoneLabel":"Telefono","addressLabel":"Indirizzo","hoursLabel":"Orari di apertura"},"nl":{"title":"Neem contact op","subtitle":"Stuur ons een bericht, dan nemen we contact met je op.","name":"Naam","email":"E-mail","phone":"Telefoon","message":"Bericht","messagePh":"Waarmee kunnen we helpen?","send":"Bericht sturen","sending":"Versturen…","required":"Verplicht","badEmail":"Voer een geldig e-mailadres in","optional":"optioneel","select":"Kies…","failed":"Je bericht is niet verstuurd. Probeer het opnieuw.","done":"Bericht verstuurd","doneSub":"Bedankt voor je bericht. We reageren zo snel mogelijk.","another":"Nog een bericht sturen","emailLabel":"E-mail","phoneLabel":"Telefoon","addressLabel":"Adres","hoursLabel":"Openingstijden"},"pl":{"title":"Skontaktuj się z nami","subtitle":"Napisz do nas, a odpowiemy najszybciej, jak to możliwe.","name":"Imię i nazwisko","email":"E-mail","phone":"Telefon","message":"Wiadomość","messagePh":"W czym możemy pomóc?","send":"Wyślij wiadomość","sending":"Wysyłanie…","required":"Wymagane","badEmail":"Wpisz prawidłowy adres e-mail","optional":"opcjonalnie","select":"Wybierz…","failed":"Wiadomość nie została wysłana. Spróbuj ponownie.","done":"Wiadomość wysłana","doneSub":"Dziękujemy za wiadomość. Odpowiemy najszybciej, jak to możliwe.","another":"Wyślij kolejną wiadomość","emailLabel":"E-mail","phoneLabel":"Telefon","addressLabel":"Adres","hoursLabel":"Godziny otwarcia"},"vi":{"title":"Liên hệ","subtitle":"Hãy gửi tin nhắn cho chúng tôi, chúng tôi sẽ phản hồi bạn.","name":"Tên","email":"Email","phone":"Số điện thoại","message":"Tin nhắn","messagePh":"Chúng tôi có thể giúp gì cho bạn?","send":"Gửi tin nhắn","sending":"Đang gửi…","required":"Bắt buộc","badEmail":"Nhập địa chỉ email hợp lệ","optional":"không bắt buộc","select":"Chọn…","failed":"Tin nhắn của bạn chưa được gửi. Vui lòng thử lại.","done":"Đã gửi tin nhắn","doneSub":"Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.","another":"Gửi tin nhắn khác","emailLabel":"Email","phoneLabel":"Số điện thoại","addressLabel":"Địa chỉ","hoursLabel":"Giờ mở cửa"},"hi":{"title":"संपर्क करें","subtitle":"हमें मैसेज भेजें, हम जल्द ही आपसे संपर्क करेंगे।","name":"नाम","email":"ईमेल","phone":"फ़ोन","message":"मैसेज","messagePh":"हम आपकी क्या मदद कर सकते हैं?","send":"मैसेज भेजें","sending":"भेजा जा रहा है…","required":"ज़रूरी","badEmail":"मान्य ईमेल पता डालें","optional":"वैकल्पिक","select":"चुनें…","failed":"आपका मैसेज नहीं भेजा गया। कृपया फिर से कोशिश करें।","done":"मैसेज भेजा गया","doneSub":"संपर्क करने के लिए धन्यवाद। हम जल्द से जल्द जवाब देंगे।","another":"एक और मैसेज भेजें","emailLabel":"ईमेल","phoneLabel":"फ़ोन","addressLabel":"पता","hoursLabel":"खुलने का समय"},"zh":{"title":"联系我们","subtitle":"给我们留言，我们会尽快回复你。","name":"名称","email":"邮箱","phone":"手机号","message":"消息","messagePh":"需要什么帮助？","send":"发送消息","sending":"正在发送…","required":"必填","badEmail":"请输入有效的邮箱地址","optional":"选填","select":"请选择…","failed":"消息未发送，请重试。","done":"消息已发送","doneSub":"感谢你的来信，我们会尽快回复。","another":"再发一条消息","emailLabel":"邮箱","phoneLabel":"手机号","addressLabel":"地址","hoursLabel":"营业时间"},"ja":{"title":"お問い合わせ","subtitle":"メッセージをお送りいただければ、折り返しご連絡します。","name":"名前","email":"メールアドレス","phone":"電話番号","message":"メッセージ","messagePh":"どのようなご用件ですか？","send":"メッセージを送信","sending":"送信しています…","required":"必須","badEmail":"有効なメールアドレスを入力してください","optional":"任意","select":"選択してください…","failed":"メッセージを送信できませんでした。もう一度お試しください。","done":"メッセージを送信しました","doneSub":"お問い合わせいただきありがとうございます。できるだけ早くご返信します。","another":"別のメッセージを送る","emailLabel":"メールアドレス","phoneLabel":"電話番号","addressLabel":"住所","hoursLabel":"営業時間"}};
  const ybLang = String((typeof activeLang === "string" && activeLang) || (typeof document !== "undefined" && document.documentElement.lang) || "en").toLowerCase().split(/[-_]/)[0];
  const L = Object.assign({
    title: "Get in touch", subtitle: "Send us a message and we'll get back to you.",
    name: "Name", email: "Email", phone: "Phone", message: "Message", messagePh: "How can we help?",
    send: "Send message", sending: "Sending…", required: "Required", badEmail: "Enter a valid email address",
    optional: "optional", select: "Choose…", failed: "Your message wasn't sent. Please try again.",
    done: "Message sent", doneSub: "Thanks for reaching out. We'll reply as soon as we can.", another: "Send another message",
    emailLabel: "Email", phoneLabel: "Phone", addressLabel: "Address", hoursLabel: "Opening hours",
  }, YB_WORDS[ybLang] || {}, labels);

  const loggedIn = typeof isLoggedIn !== "undefined" && !!isLoggedIn;
  const me = (typeof user !== "undefined" && user) || {};
  const usePublic = publicSave != null ? publicSave : !loggedIn;
  const rtl = (typeof dir !== "undefined" && dir === "rtl") || (typeof document !== "undefined" && document.documentElement.dir === "rtl");
  const reduce = typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const list = (Array.isArray(fields) && fields.length ? fields : [
    { key: "name", label: L.name, required: true, autoComplete: "name" },
    { key: "email", label: L.email, type: "email", required: true, autoComplete: "email" },
    { key: "phone", label: L.phone, type: "tel", autoComplete: "tel" },
    { key: "message", label: L.message, type: "textarea", required: true, placeholder: L.messagePh },
  ]).filter((f) => f && f.key);

  const blankForm = () => {
    const o = {};
    list.forEach((f) => {
      o[f.key] = f.type === "checkbox" ? false : "";
      if (loggedIn && f.key === "name" && me.name) o[f.key] = me.name;
      if (loggedIn && f.type === "email" && me.email) o[f.key] = me.email;
    });
    return o;
  };
  const [form, setForm] = useState(blankForm);
  const [trap, setTrap] = useState("");
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const bornAt = useRef(Date.now());
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const blank = (v) => v == null || v === false || (typeof v === "string" && !v.trim());
  const errs = {};
  list.forEach((f) => {
    const v = form[f.key];
    if (f.required && blank(v)) errs[f.key] = L.required;
    else if (f.type === "email" && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v).trim())) errs[f.key] = L.badEmail;
  });
  const show = (k) => (tried || touched[k]) && errs[k];

  async function onSubmit(e) {
    e.preventDefault();
    setTried(true); setError("");
    const bad = Object.keys(errs);
    if (bad.length) {
      const el = typeof document !== "undefined" && document.getElementById("yb-contact-" + bad[0]);
      if (el && el.focus) el.focus();
      return;
    }
    /* Never report a successful submission without actual delivery. */
    if (trap) { setError(L.failed); return; }
    setBusy(true);
    const payload = { ...extra };
    list.forEach((f) => {
      let v = form[f.key];
      if (typeof v === "string") v = v.trim();
      if (f.type === "number" && v !== "") v = Number(v);
      if (v !== "" && v != null) payload[f.key] = v;
    });
    try {
      if (usePublic) await sdk.savePublic(collection, payload); else await sdk.save(collection, payload);
      if (!alive.current) return;
      setDone(true);
      onSent && onSent(payload);
    } catch (e2) {
      if (alive.current) setError((e2 && e2.message) || L.failed);
    } finally {
      if (alive.current) setBusy(false);
    }
  }

  function reset() { setForm(blankForm()); setTouched({}); setTried(false); setError(""); setDone(false); bornAt.current = Date.now(); }

  /* ---------- render helpers (plain functions, not components – keeps input focus) ---------- */
  const ring = (err) => (err ? "border-error focus:ring-error/15" : "border-border focus:border-primary focus:ring-primary/15");
  const base = "w-full rounded-xl border bg-surface text-[15px] text-text shadow-sm transition placeholder:text-text-muted focus:outline-none focus:ring-4 ";

  const control = (f) => {
    const id = "yb-contact-" + f.key; const err = show(f.key);
    const common = { id, name: f.key, onBlur: () => setTouched((t) => ({ ...t, [f.key]: true })), "aria-invalid": !!err,
                     "aria-describedby": err ? id + "-err" : undefined, autoComplete: f.autoComplete };
    if (f.type === "textarea") {
      return <textarea rows={f.rows || 5} {...common} value={form[f.key]} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)}
                       className={base + "min-h-[132px] resize-y px-3.5 py-3 leading-relaxed " + ring(err)} />;
    }
    if (f.type === "select") {
      return (
        <div className="relative">
          <select {...common} value={form[f.key]} onChange={(e) => set(f.key, e.target.value)} className={base + "h-11 appearance-none ps-3.5 pe-10 " + ring(err)}>
            <option value="">{f.placeholder || L.select}</option>
            {(f.options || []).map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>
      );
    }
    return <input type={f.type || "text"} {...common} value={form[f.key]} placeholder={f.placeholder}
                  inputMode={f.type === "email" ? "email" : f.type === "tel" ? "tel" : undefined}
                  onChange={(e) => set(f.key, e.target.value)} className={base + "h-11 px-3.5 " + ring(err)} />;
  };

  const fieldBlock = (f) => {
    const id = "yb-contact-" + f.key; const err = show(f.key);
    const wide = f.type === "textarea" || f.type === "checkbox" || f.wide;
    if (f.type === "checkbox") {
      return (
        <div key={f.key} className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-text-secondary">
            <input type="checkbox" id={id} checked={!!form[f.key]} onChange={(e) => set(f.key, e.target.checked)}
                   className="h-[18px] w-[18px] shrink-0 rounded accent-[var(--primary)]" />
            <span>{f.text || f.label}{f.required && <span className="text-error"> *</span>}</span>
          </label>
          {err && <p id={id + "-err"} className="flex items-center gap-1 text-xs text-error"><AlertCircle size={13} />{err}</p>}
        </div>
      );
    }
    return (
      <div key={f.key} className={"flex flex-col gap-1.5 " + (wide ? "sm:col-span-2" : "")}>
        <label htmlFor={id} className="text-sm font-medium text-text">
          {f.label}{!f.required && <span className="ms-1 font-normal text-text-muted">({L.optional})</span>}
        </label>
        {control(f)}
        {err && <p id={id + "-err"} className="flex items-center gap-1 text-xs text-error"><AlertCircle size={13} />{err}</p>}
      </div>
    );
  };

  const MapIcon = typeof MapPin !== "undefined" ? MapPin : Home;
  const info = [
    email && { k: "email", icon: <Mail size={18} />, label: L.emailLabel, value: email, href: "mailto:" + email },
    phone && { k: "phone", icon: <Phone size={18} />, label: L.phoneLabel, value: phone, href: "tel:" + String(phone).replace(/[^\d+]/g, "") },
    address && { k: "address", icon: <MapIcon size={18} />, label: L.addressLabel, value: address,
                 href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address), external: true },
    hours && { k: "hours", icon: <Clock size={18} />, label: L.hoursLabel, value: Array.isArray(hours) ? hours.join("\n") : hours },
  ].filter(Boolean);

  const infoItem = (it, compact) => {
    const inner = (
      <>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">{it.icon}</span>
        <span className="min-w-0">
          <span className="block text-xs font-medium text-text-muted">{it.label}</span>
          <span className={"mt-0.5 block whitespace-pre-line break-words text-[15px] text-text " + (compact ? "" : "leading-relaxed")}>{it.value}</span>
        </span>
      </>
    );
    const cls = "flex items-start gap-3.5 rounded-2xl p-3 -m-3 text-start transition";
    return it.href ? (
      <a key={it.k} href={it.href} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener noreferrer" : undefined}
         className={cls + " hover:bg-surface-2"}>{inner}</a>
    ) : <div key={it.k} className={cls}>{inner}</div>;
  };

  const success = (
    <div className="flex min-h-[340px] flex-col items-center justify-center px-2 py-10 text-center" role="status">
      <div className="relative mb-6 h-16 w-16">
        {!reduce && <span aria-hidden="true" className="yb-contact-ring absolute inset-0 rounded-full bg-success-light" />}
        <span className={"relative flex h-16 w-16 items-center justify-center rounded-full bg-success-light text-success " + (reduce ? "" : "yb-contact-pop")}>
          <span className={reduce ? "" : "yb-contact-tick"}><Check size={30} strokeWidth={2.5} /></span>
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-text">{L.done}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-text-secondary">{L.doneSub}</p>
      <button type="button" onClick={reset}
              className="mt-7 min-h-[44px] rounded-xl border border-border px-5 text-sm font-medium text-text transition hover:bg-surface-2">{L.another}</button>
    </div>
  );

  const formEl = (
    <form onSubmit={onSubmit} noValidate className="relative">
      {!contactConfigured && <p id="contact-availability" role="status" className="mb-6 rounded-lg border border-border bg-surface p-4 text-sm text-text-secondary">Online inquiries are not connected yet. This form cannot send messages until a delivery endpoint is configured.</p>}
      {/* honeypot – invisible to people, irresistible to bots */}
      <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none", insetInlineStart: -9999 }}>
        <label htmlFor="yb-contact-website">Website</label>
        <input id="yb-contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{list.map(fieldBlock)}</div>
      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2.5 rounded-xl border border-error/20 bg-error-light px-3.5 py-3 text-sm text-error-text">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span>
        </div>
      )}
      <button type="submit" disabled={busy || !contactConfigured} aria-describedby={!contactConfigured ? "contact-availability" : undefined}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 text-[15px] font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,143,240,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {busy ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} className={rtl ? "-scale-x-100" : ""} />}
        {busy ? L.sending : L.send}
      </button>
    </form>
  );

  const card = <div className="rounded-2xl border border-border bg-background p-5 shadow-md sm:p-8">{done ? success : formEl}</div>;
  const css = (
    <style>{`
      .yb-contact-pop{animation:yb-contact-pop .55s cubic-bezier(.34,1.56,.64,1) both}
      .yb-contact-tick{display:inline-flex;animation:yb-contact-tick .5s .15s cubic-bezier(.34,1.56,.64,1) both}
      .yb-contact-ring{animation:yb-contact-ring 1.1s .1s ease-out both}
      @keyframes yb-contact-pop{from{transform:scale(.6)}to{transform:scale(1)}}
      @keyframes yb-contact-tick{from{transform:scale(.3) rotate(-25deg)}to{transform:scale(1) rotate(0)}}
      @keyframes yb-contact-ring{from{transform:scale(1);opacity:.9}to{transform:scale(1.9);opacity:0}}
      @media (prefers-reduced-motion: reduce){.yb-contact-pop,.yb-contact-tick,.yb-contact-ring{animation:none}.yb-contact-ring{opacity:0}}
    `}</style>
  );
  const heading = (center) => (
    <div className={center ? "mx-auto max-w-xl text-center" : ""}>
      {L.title && <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">{L.title}</h2>}
      {L.subtitle && <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">{L.subtitle}</p>}
    </div>
  );

  if (layout === "split" && info.length) {
    return (
      <section className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {css}
        <div className="flex flex-col gap-8 lg:pt-4">
          {heading(false)}
          <div className="flex flex-col gap-6">{info.map((it) => infoItem(it, false))}</div>
        </div>
        {card}
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8">
      {css}
      {heading(true)}
      {info.length > 0 && (
        <div className="grid gap-x-6 gap-y-5 rounded-3xl border border-border bg-surface-2 p-5 sm:grid-cols-2 sm:p-6">
          {info.map((it) => infoItem(it, true))}
        </div>
      )}
      {card}
    </section>
  );
}

