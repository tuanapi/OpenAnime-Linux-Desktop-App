# OpenAnime Linux İstemcisi

**Linux kullanıcıları için eksik parça.**

[OpenAnime](https://openani.me) için geliştirilmiş, **resmi olmayan (unofficial)**, Linux'a özel bir masaüstü istemcisidir. Android ve Windows'un kendi yerel uygulamaları varken, Linux kullanıcıları genellikle tarayıcı uyumluluğu ile mücadele eder—özellikle de çoğu Linux tarayıcısında varsayılan olarak devre dışı bırakılan **WebGPU** işlevini etkinleştirmek zordur.

Bu istemci bu sorunu çözer. Kutudan çıktığı gibi tam **WebGPU ve Vulkan** donanım hızlandırmasını Linux'a getiren, en iyi yayın performansını sağlayan "Tak ve Çalıştır" çözümüdür.

![OpenAnime Icon](icon512.png)

## 🚀 Özellikler

*   **Donanım Hızlandırma**: WebGPU ve Vulkan ile güçlendirilmiş Electron altyapısı sayesinde akıcı 4K oynatma.
*   **Renk Doğruluğu**: Yüksek çözünürlüklü ekranlarda video renk bozulmasını önlemek için zorlanmış `sRGB` renk profili.
*   **Sürükleyici Arayüz**: Tam ekranda **otomatik gizlenen** özel "trafik ışığı" kontrollerine (Küçült, Büyüt, Kapat) sahip çerçevesiz pencere.
*   **Tak ve Çalıştır**: Tek dosyalık AppImage. Kurulum gerektirmez.
*   **Akıllı Kontroller**: Yeşil buton anında "Gerçek Tam Ekran" moduna geçirir. Odaklanma mantığı, hatalı çift tıklamaları önler.

## 📥 Kurulum

### Seçenek 1: AppImage (Önerilen)
1.  [Releases](../../releases) sayfasından `.AppImage` dosyasını indirin.
2.  Çalıştırılabilir yapın:
    ```bash
    chmod +x OpenAnime-1.0.0.AppImage
    ```
3.  Çalıştırın!

    **Sistem Entegrasyonu (Masaüstü Kısayolu ve İkon)**:
    OpenAnime'yi uygulama menünüze eklemek için:
    1.  Depodan (veya Releases kısmından) `install.sh` dosyasını indirin.
    2.  AppImage ile aynı klasöre koyun.
    3.  Çalıştırın:
        ```bash
        chmod +x install.sh
        ./install.sh
        ```

### Seçenek 2: AUR (Arch Linux)
OpenAnime, AUR üzerinde `openanime-bin` adıyla mevcuttur.
```bash
yay -S openanime-bin
```

### Seçenek 3: Flatpak
Yakında Flathub'da.
```bash
flatpak install com.openanime.app
```

## 🛠️ Kaynak Kodundan Derleme

Gereksinimler: `node`, `npm`.

1.  **Klonla**:
    ```bash
    git clone https://github.com/tuanapi/OpenAnime-Linux-Desktop-App.git
    cd OpenAnime-Linux-Desktop-App
    ```
2.  **Bağımlılıkları Yükle**:
    ```bash
    npm install
    ```
3.  **Çalıştır (Geliştirici Modu)**:
    ```bash
    npm start
    ```
4.  **Derle (AppImage)**:
    ```bash
    npm run dist
    ```
    Çıktı `dist/` klasöründe olacaktır.

5.  **Sisteme Kur (İsteğe Bağlı)**:
    ```bash
    ./packaging/install.sh
    ```

## ⚠️ Bilinen Sorunlar

### Linux'ta WebGPU Renkleri
**WebGPU (Performans Modu)** seçeneğini etkinleştirmek deneyseldir ve büyük ölçüde sistem sürücülerinize bağlıdır. Bazı yapılandırmalarda (özellikle 4K/HDR içeriklerde) bu mod şunlara neden olabilir:
*   **Ters Renkler** (Kırmızı/Mavi yer değiştirmiş)
*   **Soluk / Grileşmiş renkler**

**Çözüm:** Bunu yaşarsanız, yapılandırmayı sıfırlamak için `Shift + O` tuşlarına basın, uygulamayı yeniden başlatın ve sorulduğunda **"Kapat (Renk Doğruluğu)"** seçeneğini seçin. Bu, standart, renk doğruluğu olan işleme hattını zorlar.

## 📜 Lisans
MIT
