# OpenAnime Linux İstemcisi

**Linux kullanıcıları için eksik parça.**

[OpenAnime](https://openani.me) için geliştirilmiş, **resmi olmayan (unofficial)**, Linux'a özel bir masaüstü istemcisidir. Android ve Windows'un kendi yerel uygulamaları varken, Linux kullanıcıları genellikle tarayıcı uyumluluğu ile mücadele eder—özellikle de çoğu Linux tarayıcısında varsayılan olarak devre dışı bırakılan **WebGPU** işlevini etkinleştirmek zordur.

Bu istemci bu sorunu çözer. Kutudan çıktığı gibi tam **WebGPU ve Vulkan** donanım hızlandırmasını Linux'a getiren, en iyi yayın performansını sağlayan "Tak ve Çalıştır" çözümüdür.

### 📑 Versiyon: 1.0.4 (Optimize Sürüm)
🚀 **4K Performans Odaklı**: WebGPU + Native Wayland + Vulkan entegrasyonu tamamlandı.

![OpenAnime Icon](icon512.png)

## 🚀 Özellikler

*   **Donanım Hızlandırma**: WebGPU ve Vulkan ile güçlendirilmiş Electron 35 altyapısı sayesinde akıcı 4K oynatma.
*   **Çerçevesiz Arayüz**: Tam ekranda **otomatik gizlenen** özel pencere kontrolleri (Küçült, Büyüt, Kapat).
*   **Tak ve Çalıştır**: Tek dosyalık AppImage. Kurulum gerektirmez.

## 📥 Kurulum

### Seçenek 1: AppImage (Önerilen)
1.  [Releases](../../releases) sayfasından `.AppImage` dosyasını indirin.
2.  Çalıştırılabilir yapın (Örn: `OpenAnime-1.0.3.AppImage`).
3.  Çalıştırın!

    **Sistem Entegrasyonu (Masaüstü Kısayolu ve İkon)**:
    ```bash
    chmod +x install.sh
    ./install.sh
    ```

    **Kaldırma**:
    ```bash
    chmod +x uninstall.sh
    ./uninstall.sh
    ```

### Seçenek 2: AUR (Arch Linux)
```bash
yay -S openanime-bin
```

### Seçenek 3: Flatpak
```bash
flatpak install flathub io.github.tuanapi.OpenAnime
```

## 🛠️ Kaynak Kodundan Derleme

Gereksinimler: `node`, `npm`.

```bash
git clone https://github.com/tuanapi/OpenAnime-Linux-Desktop-App.git
cd OpenAnime-Linux-Desktop-App
npm install
npm start          # Geliştirici modu
```
```bash
npm run dist       # AppImage oluştur (dist/ klasöründe)
```

## 🖥️ Test Edilen Sistem (Doğrulandı)

Bu istemci, özellikle yüksek performanslı NVIDIA sistemlerinde karşılaşılan 4K renk sorunlarını çözmek için aşağıdaki donanım üzerinde test edilmiş ve onaylanmıştır:

*   **İşletim Sistemi**: EndeavourOS (Kernel 6.18.2-arch2-1)
*   **Masaüstü Ortamı**: KDE Plasma 6.5.4 (Wayland)
*   **İşlemci**: AMD Ryzen 7 7800X3D
*   **Ekran Kartı**: NVIDIA GeForce RTX 5070 Ti (Sürücü: 590.48.01)
*   **RAM**: 64 GB

## 📜 Lisans
MIT
